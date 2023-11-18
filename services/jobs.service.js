const Jobs = require("../models/jobs.model");
const BaseService = require("./base.service");
const User = require("../services/user.service");
const UserOpenedJobs = require("../services/userOpenedJobs.service");
const userTransactions = require("./userTransactions.service");
const jobsCategories = require("./jobsCategories.service");

// Start Class
const userService = new User();
const userOpenedJobsService = new UserOpenedJobs();
const userTransactionsService = new userTransactions();
const jobsCategoriesService = new jobsCategories();

class JobsService extends BaseService {
  constructor() {
    super(Jobs);
  }

  async getJobsDetail(user, job_id) {
    // Önce kullanıcıya bakılır
    if (!user) {
      throw new Error("User not found.");
    }
    const checkUser = await userService.getById(parseInt(user));
    if (!checkUser) {
      throw new Error("User not found.");
    }

    // Job kontrol edilir var mı yok mu?
    const checkJob = await this.getById(parseInt(job_id));
    if (!checkJob) {
      throw new Error("Job not found.");
    }

    // Kullanıcının kendi job ise bilgileri döndür.
    if (checkJob.user_id === checkUser.id) {
      return {
        job: {
          data: checkJob,
        },
        user: {
          name: checkUser.name,
          phone: checkUser.country_code + checkUser.phone,
          email: checkUser.email,
        },
        opened: true,
      };
    }

    // Job silinmiş veya aktif değilse hata döndürülür.
    if (!checkJob.is_active) {
      throw new Error("Job not found.");
    }
    if (checkJob.is_deleted) {
      throw new Error("Job not found.");
    }

    // Jobs kullanıcı tarafından ödenip açılmış mı buna bakılır
    const checkOpened = await userOpenedJobsService.getWithCondition({
      user_id: checkUser.id,
      job_id: parseInt(job_id),
    });

    // Eğer açıılmışsa jobs sahibinin telefon numarası, eposta adresini ve jobs
    const jobsOwnershipDetail = await userService.getById(parseInt(checkJob.user_id));

    // Kullanıcının kendi jobu ise tüm bilgileri döndürür.
    if (checkJob.user_id === checkUser.id) {
      return {
        job: {
          data: checkJob,
        },
        user: {
          name: jobsOwnershipDetail.name,
          phone: jobsOwnershipDetail.country_code + jobsOwnershipDetail.phone,
          email: jobsOwnershipDetail.email,
        },
        opened: true,
      };
    }

    // Eğer job açılmışsa
    if (checkOpened) {
      return {
        job: {
          data: checkJob,
        },
        user: {
          name: jobsOwnershipDetail.name,
          phone: jobsOwnershipDetail.country_code + jobsOwnershipDetail.phone,
          email: jobsOwnershipDetail.email,
        },
        opened: true,
      };
    }

    // Açılmamışsa job sahibinin telefon numarası, eposta adresinin son 2 hanesi ve ilk 10 hanesi gizlenir.
    return {
      job: {
        data: checkJob,
      },
      user: {
        name: "*".repeat(6) + jobsOwnershipDetail.name.slice(-2),
        phone: "*".repeat(6) + jobsOwnershipDetail.phone.slice(-3),
        email: "*".repeat(6) + jobsOwnershipDetail.email.slice(10),
      },
      opened: false,
    };
  }

  async getJobsbyCategory(page, limit, category_id) {
    const result = await this.getAllWithPagination(page, limit, {
      category_id: parseInt(category_id),
      is_active: true,
      is_deleted: false,
    });
    return result;
  }
  async createJob(user, data) {
    // Önce kullanıcıya bakılır
    if (!user) {
      throw new Error("User not found.");
    }
    const checkUser = await userService.getById(parseInt(user));
    if (!checkUser) {
      throw new Error("User not found.");
    }
    // jobsCategoriesService ile kategori kontrol edilir.
    const checkCategory = await jobsCategoriesService.getById(parseInt(data.category_id));
    if (!checkCategory) {
      throw new Error("Category not found.");
    }

    // Kullanıcı ve data birleştirilir
    const jobData = { ...data, user_id: user };

    // Job oluşturulur.
    const created = await this.create(jobData);
    return created;
  }
  /**
   * Job görüntüleme modülü
   * @param {*} user
   * @param {*} job_id
   */
  async viewInformation(user, job_id) {
    // Önce kullanıcıya bakılır
    if (!user) {
      throw new Error("User not found.");
    }
    const checkUser = await userService.getById(parseInt(user));
    if (!checkUser) {
      throw new Error("User not found.");
    }

    // Jobs bakılır
    const checkJob = await this.getById(parseInt(job_id));
    if (!checkJob) {
      throw new Error("Listing not found.");
    }
    console.log("Jobs bulundu.");

    // Daha önce bu ilana bakılmış mı bakılır. Eğer bakıldıysa veriyi döndür.
    const checkOpened = await userOpenedJobsService.getWithCondition({
      user_id: checkUser.id,
      job_id: parseInt(job_id),
    });
    if (checkOpened) {
      return await this.getJobsDetail(checkUser.id, checkJob.id);
    }

    // Kullanıcının eğer kendi jobs ise bilgileri döndür.
    if (checkJob.user_id === checkUser.id) {
      return await this.getJobsDetail(checkUser.id, checkJob.id);
    }

    // Kullanıcı'nın hesabında yeteri kadar ücret var mı?
    const userBalance = await userTransactionsService.getUserBalance(parseInt(user));
    console.log(userBalance, "Kullanıcının bakiyesi.");
    console.log(checkJob.show_fee, "Job görüntüleme ücreti.");
    if (userBalance < checkJob.show_fee) {
      throw new Error("Insufficient funds.");
    }
    console.log("Kullanıcının bakiyesi var." + userBalance);

    // Bakiye varsa bu düşülür.
    const updateTransaction = await userTransactionsService.updateUserBalance(user, -checkJob.show_fee, `Jobs View Fee #${checkJob.id}`);
    console.log("Job Görüntülenme ücreti düşüldü." + updateTransaction);

    // İlan görüntülenme kaydı tutulur.
    await userOpenedJobsService.create({
      user_id: checkUser.id,
      transaction_id: updateTransaction.data.id,
      job_id: checkJob.id,
    });

    console.log("Görüntülenme kaydı tutuldu.");

    // Burada bilgileri getListingDetail ile döndürüyoruz.
    return await this.getJobsDetail(checkUser.id, checkJob.id);
  }
}

module.exports = JobsService;
