const { Op } = require("sequelize");
const Listing = require("../models/listing.model");
const BaseService = require("./base.service");
const userService = require("./user.service");
const userTransactionsService = require("./userTransactions.service");
const userOpenedListingsService = require("./userOpenedListings.service");
const listingIncludeFilesService = require("./listingIncludeFiles.service");
const bunnyHelper = require("./../utils/bunny.helper");

class ListingsService extends BaseService {
  constructor() {
    super(Listing);
  }

  async getListingDetail(user, listing_id) {
    // Önce kullanıcıya bakılır
    if (!user) {
      throw new Error("User not found.");
    }
    const checkUser = await userService.getById(parseInt(user));
    if (!checkUser) {
      throw new Error("User not found.");
    }

    // İlan kontrol edilir var mı yok mu?
    const checkListing = await this.getById(parseInt(listing_id));
    if (!checkListing) {
      throw new Error("Listing not found.");
    }

    // İlan silinmiş veya aktif değilse hata döndürülür.
    if (!checkListing.is_active) {
      throw new Error("Listing not found.");
    }
    if (checkListing.is_deleted) {
      throw new Error("Listing not found.");
    }

    // İlan kullanıcı tarafından ödenip açılmış mı buna bakılır
    const checkOpened = await userOpenedListingsService.getWithCondition({
      user_id: checkUser.id,
      listing_id: parseInt(listing_id),
    });

    // Eğer açıılmışsa ilan sahibinin telefon numarası, eposta adresini ve ilan detaylarında eklenen file'ları döndür.
    const listingOwnershipDetail = await userService.getById(parseInt(checkListing.user_id));
    const listingIncludeFiles = await listingIncludeFilesService.getAllwithCondition({
      listing_id: checkListing.id,
    });

    // Eğer ilan açılmışsa
    if (checkOpened) {
      return {
        listing: {
          data: checkListing,
        },
        // TODO: Burası yapılacak
        remaining_apply: {
          count: 0,
        },
        additional_files: {
          files: listingIncludeFiles,
          file_count: listingIncludeFiles.length,
        },
        user: {
          name: listingOwnershipDetail.name,
          phone: listingOwnershipDetail.country_code + listingOwnershipDetail.phone,
          email: listingOwnershipDetail.email,
        },
        opened: true,
      };
    }

    // Açılmamışsa ilan sahibinin telefon numarası, eposta adresinin son 2 hanesi ve ilk 10 hanesi gizlenir.
    return {
      listing: {
        data: checkListing,
      },
      remaining_apply: {
        count: 0,
      },
      additional_files: {
        files: [],
        file_count: listingIncludeFiles.length,
      },
      user: {
        name: "*".repeat(6) + listingOwnershipDetail.name.slice(-2),
        phone: "*".repeat(6) + listingOwnershipDetail.phone.slice(-3),
        email: "*".repeat(6) + listingOwnershipDetail.email.slice(10),
      },
      opened: false,
    };
  }

  async createListing(user, data) {
    // Önce kullanıcıya bakılır
    if (!user) {
      throw new Error("User not found.");
    }
    const checkUser = await userService.getById(parseInt(user));
    if (!checkUser) {
      throw new Error("User not found.");
    }
    // Kategori eklenecek

    // Kullanıcı ve data birleştirilir
    const listingData = { ...data, user_id: user };
    // İlan oluşturulur.

    const created = await this.create(listingData);

    // include_files array olarak geliyor ama boşta olabilir, her array için tek tek kayıt yapılacak.
    if (data.include_files) {
      if (data.include_files.length > 0) {
        for (let i = 0; i < data.include_files.length; i++) {
          await listingIncludeFilesService.create({
            listing_id: created.id,
            file_id: data.include_files[i],
          });
        }
      }
    }
    return created;
  }

  /**
   * İlan görüntüleme modülü
   * @param {*} user
   * @param {*} listing_id
   */
  async viewInformation(user, listing_id) {
    // Önce kullanıcıya bakılır
    if (!user) {
      throw new Error("User not found.");
    }
    const checkUser = await userService.getById(parseInt(user));
    if (!checkUser) {
      throw new Error("User not found.");
    }

    console.log("Kullanıcı bulundu.");

    // İlana bakılır
    const checkListing = await this.getById(parseInt(listing_id));
    if (!checkListing) {
      throw new Error("Listing not found.");
    }
    console.log("İlan bulundu.");

    // Daha önce bu ilana bakılmış mı bakılır. Eğer bakıldıysa veriyi döndür.
    const checkOpened = await userOpenedListingsService.getWithCondition({
      user_id: checkUser.id,
      listing_id: parseInt(listing_id),
    });
    if (checkOpened) {
      return await this.getListingDetail(checkUser.id, checkListing.id);
    }

    // Kullanıcı'nın hesabında yeteri kadar ücret var mı?
    const userBalance = await userTransactionsService.getUserBalance(parseInt(user));
    if (userBalance < checkListing.show_fee) {
      throw new Error("Insufficient funds.");
    }
    console.log("Kullanıcının bakiyesi var." + userBalance);

    // Bakiye varsa bu düşülür.
    const updateTransaction = await userTransactionsService.updateUserBalance(user, -checkListing.show_fee, `Listing View Fee #${checkListing.id}`);
    console.log("İlan ücreti düşüldü." + updateTransaction);

    // TODO: İlan görüntülenme sayısı arttırılır.

    console.log("İlan görüntülenme sayısı arttırıldı. + TODO");

    // İlan görüntülenme kaydı tutulur.
    await userOpenedListingsService.create({
      user_id: checkUser.id,
      transaction_id: updateTransaction.data.id,
      listing_id: checkListing.id,
    });

    console.log("Görüntülenme kaydı tutuldu.");

    // Burada bilgileri getListingDetail ile döndürüyoruz.
    return await this.getListingDetail(checkUser.id, checkListing.id);
  }
}

module.exports = new ListingsService();
