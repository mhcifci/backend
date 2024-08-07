require("../models/associations/listing.model");

const UserFollowListings = require("../models/userFollowListings.model");
const Listings = require("../models/listing.model");
const User = require("../models/user.model");
const ListingCategories = require("../models/listingCategories.model");

const BaseService = require("./base.service");
const user = require("./user.service");
const userDetails = require("./userDetails.service");
const userTransactions = require("./userTransactions.service");
const userOpenedListings = require("./userOpenedListings.service");
const listingIncludeFiles = require("./listingIncludeFiles.service");
const listingCategory = require("./listingCategories.service");
const postCodes = require("./postCodes.service");

const { Op } = require("sequelize");
const sequelize = require("../config/database");

// Start Class
const userService = new user();
const UserDetailsService = new userDetails();
const userTransactionsService = new userTransactions();
const userOpenedListingsService = new userOpenedListings();
const listingIncludeFilesService = new listingIncludeFiles();
const listingCategoryService = new listingCategory();
const postCodesService = new postCodes();

class ListingsService extends BaseService {
  constructor() {
    super(Listings);
  }

  async getFollowedListings(user_id, page = 1, limit = 10) {
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows } = await UserFollowListings.findAndCountAll({
      where: {
        user_id: user_id,
        is_following: true,
      },
      is_active: true,

      include: [
        {
          model: Listings,
          include: [
            {
              model: ListingCategories,
            },

            {
              model: User,
            },
          ],
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    const listings = rows.map((row) => row.dataValues || []);

    if (rows) {
      return {
        data: listings.length > 0 ? listings : [],
        currentPage: parseInt(page),
        currentLimit: parseInt(limit),
        total: count,
        totalPages: Math.ceil(count / limit),
      };
    }
    return {
      data: [],
      currentPage: page,
      currentLimit: limit,
      total: 0,
      totalPages: Math.ceil(0 / limit),
    };
  }

  async getNotInterestedListings(user_id, page = 1, limit = 10) {
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows } = await UserFollowListings.findAndCountAll({
      where: {
        user_id: user_id,
        is_following: false,
      },
      is_active: true,

      include: [
        {
          model: Listings,
          include: [
            {
              model: ListingCategories,
            },
            {
              model: User,
            },
          ],
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    const listings = rows.map((row) => row.dataValues || []);

    if (rows) {
      return {
        data: listings.length > 0 ? listings : [],
        currentPage: parseInt(page),
        currentLimit: parseInt(limit),
        total: count,
        totalPages: Math.ceil(count / limit),
      };
    }
    return {
      data: [],
      currentPage: page,
      currentLimit: limit,
      total: 0,
      totalPages: Math.ceil(0 / limit),
    };
  }

  async searchListing(user_id, search, page = 1, limit = 10) {
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const unfollowed = await this.getUserUnfollowedListings(user_id);
    let whereClause = {
      id: {
        [Op.notIn]: unfollowed.length > 0 ? unfollowed : [0],
      },
      is_active: true,

      [Op.or]: [
        {
          description: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    };

    const { count, rows } = await Listings.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: UserFollowListings,
          where: {
            user_id: user_id,
          },
          attributes: ["is_following"],
          required: false,
        },
        {
          model: ListingCategories,
        },
        {
          model: User,
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return {
      data: rows,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      currentLimit: parseInt(limit),
    };
  }
  async searchListingNew(user_id, search = null, category_id = null, spesific_post_code, spesific_max_mile = 50, page = 1, limit = 10) {
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const unfollowed = await this.getUserUnfollowedListings(user_id);

    let whereClause = {
      id: {
        [Op.notIn]: unfollowed.length > 0 ? unfollowed : [0],
      },
      is_active: true,
    };

    // search parametresi varsa ve bir değere sahipse where koşuluna ekle
    if (search) {
      whereClause[Op.or] = [
        {
          description: {
            [Op.like]: `%${search}%`,
          },
        },
      ];
    }

    if (spesific_post_code) {
      whereClause[Op.or] = [
        {
          country: {
            [Op.like]: `%${spesific_post_code }%`,
          },
        },
      ];
    }

    // category_id parametresi varsa ve bir değere sahipse where koşuluna ekle
    if (category_id) {
      whereClause["category_id"] = category_id;
    }


    // ! TODO Sonrasında eklenebilir burası silmiyorum.
    // if (spesific_post_code && spesific_max_mile) {
    //   const postcodeDetail = await postCodesService.getLatLongFromPostcode(spesific_post_code);
    //   if (!postcodeDetail) throw new Error("Postcode not found.");
    //   const radius = spesific_max_mile * 1609.34;
    //   whereClause[Op.and] = sequelize.literal(`ST_Distance_Sphere(point(longitude, latitude), point(${postcodeDetail.longitude}, ${postcodeDetail.latitude})) <= ${radius}`);
    // }

    const { count, rows } = await Listings.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: UserFollowListings,
          where: {
            user_id: user_id,
          },
          attributes: ["is_following"],
          required: false,
        },
        {
          model: ListingCategories,
        },
        {
          model: User,
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return {
      data: rows,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      currentLimit: parseInt(limit),
    };
  }

  async getListingByPostcodeAndRadius(user_id, spesific_post_code, spesific_max_mile = 10, page = 1, limit = 10) {
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const unfollowed = await this.getUserUnfollowedListings(user_id);
    let whereClause = {
      id: {
        [Op.notIn]: unfollowed.length > 0 ? unfollowed : [0],
      },
      is_active: true,
    };

    if (spesific_post_code && spesific_max_mile) {
      const postcodeDetail = await postCodesService.getLatLongFromPostcode(spesific_post_code);
      if (!postcodeDetail) throw new Error("Postcode not found.");
      const radius = spesific_max_mile * 1609.34;
      whereClause[Op.and] = sequelize.literal(`ST_Distance_Sphere(point(longitude, latitude), point(${postcodeDetail.longitude}, ${postcodeDetail.latitude})) <= ${radius}`);
    }

    const { count, rows } = await Listings.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: UserFollowListings,
          attributes: ["is_following"],
        },
        {
          model: User,
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return {
      data: rows,
      spesific_max_mile: parseInt(spesific_max_mile),
      spesific_post_code,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      currentLimit: parseInt(limit),
    };
  }

  async getListingsByPreferences(user_id, page = 1, limit = 10) {
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const unfollowed = await this.getUserUnfollowedListings(user_id);
    let whereClause = {
      id: {
        [Op.notIn]: unfollowed.length > 0 ? unfollowed : [0],
      },
      is_active: true,
    };

    const { preffered_post_code, preffered_max_mile } = await UserDetailsService.getUserPreferences(user_id);

    if (preffered_post_code && preffered_max_mile) {
      const { latitude, longitude } = await postCodesService.getLatLongFromPostcode(preffered_post_code);
      const radius = preffered_max_mile * 1609.34;
      whereClause[Op.and] = sequelize.literal(`ST_Distance_Sphere(point(longitude, latitude), point(${longitude}, ${latitude})) <= ${radius}`);
    }

    const { count, rows } = await Listings.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: UserFollowListings,
          attributes: ["is_following"],
        },
        {
          model: User,
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return {
      data: rows,
      preffered_max_mile,
      preffered_post_code,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      currentLimit: parseInt(limit),
    };
  }

  async getListingsbyPublic(page = 1, limit = 10) {
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows } = await Listings.findAndCountAll({
      where: {
        is_active: true,
        },
      include: [
        {
          model: User,
          attributes: ["id", "name", "surname"],
        },
        {
          model: ListingCategories,
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    for (let i = 0; i < rows.length; i++) {
      const element = rows[i];
      if (element.user && element.user.dataValues) {
        element.user.dataValues.name = "*".repeat(6) + element.user.dataValues.name.slice(-2);
        element.user.dataValues.surname = "*".repeat(6) + element.user.dataValues.surname.slice(-2);
      }
    }

    // Adamın eğer preferred post code'u varsa buna göre listele yoksa diğer listelemelerle beraber getir.

    return {
      data: rows,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      currentLimit: parseInt(limit),
    };
  }
  async getListingsbyUser(user_id, page = 1, limit = 10) {
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const unfollowed = await this.getUserUnfollowedListings(user_id);

    const { count, rows } = await Listings.findAndCountAll({
      where: {
        id: {
          [Op.notIn]: unfollowed.length > 0 ? unfollowed : [0],
        },
        is_active: true,
        },
      include: [
        {
          model: UserFollowListings,
          where: {
            user_id: user_id,
          },
          attributes: ["is_following"],
          required: false,
        },
        {
          model: User,
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    // Adamın eğer preferred post code'u varsa buna göre listele yoksa diğer listelemelerle beraber getir.

    return {
      data: rows,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      currentLimit: parseInt(limit),
    };
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
    const checkListing = await this.getWithExtras({
      where: {
        id: parseInt(listing_id),
        is_active: true,
        },
      include: [
        {
          model: ListingCategories,
        },
        {
          model: User,
        },
      ],
    });
    if (!checkListing) {
      throw new Error("Listing not found.");
    }

    // Kullanıcının kendi ilanı ise bilgileri döndür.
    if (checkListing.user_id === checkUser.id) {
      return {
        listing: {
          data: checkListing,
        },
        remaining_apply: {
          max_apply: checkListing.max_apply,
          opened: 0,
          remaining: checkListing.max_apply,
        },
        additional_files: {
          files: [],
          file_count: 0,
        },
        user: {
          name: checkUser.name,
          phone: checkUser.country_code + checkUser.phone,
          email: checkUser.email,
        },
        opened: true,
      };
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
    const listingIncludeFiles = await listingIncludeFilesService.getFileUrls(parseInt(listing_id));

    const remainingApply = await this.getRemainingApply(checkUser.id, checkListing.id);

    // Kullanıcının kendi ilanı ise tüm bilgileri döndürür.
    if (checkListing.user_id === checkUser.id) {
      return {
        listing: {
          data: checkListing,
        },
        remaining_apply: remainingApply,
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

    // Eğer ilan açılmışsa
    if (checkOpened) {
      return {
        listing: {
          data: checkListing,
        },
        remaining_apply: remainingApply,
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
      remaining_apply: remainingApply,
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
    // ListingCategoryService ile kategori kontrol edilir.
    const checkCategory = await listingCategoryService.getById(parseInt(data.category_id));
    if (!checkCategory) {
      throw new Error("Category not found.");
    }

    const findLatLang = await postCodesService.getLatLongFromPostcode(data.country);
    if (!findLatLang) {
      throw new Error("Country not found.");
    }

    const listingData = { ...data, user_id: user, country: findLatLang.postcode, latitude: findLatLang.latitude, longitude: findLatLang.longitude };

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

    // Kullanıcının eğer kendi ilanı ise bilgileri döndür.
    if (checkListing.user_id === checkUser.id) {
      return await this.getListingDetail(checkUser.id, checkListing.id);
    }

    // İlanın remaining_apply değeri 0'dan küçükse hata döndürülür.
    const remainingApply = await this.getRemainingApply(checkUser.id, checkListing.id);
    if (remainingApply.remaining <= 0) {
      throw new Error("Listing has reached the maximum number of apply.");
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
  async getRemainingApply(user, listing_id) {
    // Önce kullanıcıya bakılır
    if (!user) {
      throw new Error("User not found.");
    }
    const checkUser = await userService.getById(parseInt(user));
    if (!checkUser) {
      throw new Error("User not found.");
    }

    // İlana bakılır
    const checkListing = await this.getById(parseInt(listing_id));
    if (!checkListing) {
      throw new Error("Listing not found.");
    }

    console.log(checkListing);
    // Toplam ilan açılma sayısına bakılır
    const totalOpened = await userOpenedListingsService.countwithCondition({
      listing_id: parseInt(listing_id),
    });

    // Kullanıcı eğer daha önce açmışsa hata döndürme, açmamışsa max_apply ile toplam açılma sayısı döndürülür.
    const checkOpened = await userOpenedListingsService.getWithCondition({
      user_id: checkUser.id,
      listing_id: parseInt(listing_id),
    });

    console.log(checkOpened);

    if (checkOpened) {
      return {
        max_apply: checkListing.max_apply,
        opened: totalOpened,
        remaining: checkListing.max_apply - totalOpened,
      };
    }

    // Eğer açılan sayı max_apply sayısını geçmişse hata döndürülür.
    if (totalOpened >= checkListing.max_apply) {
      throw new Error("Listing has reached the maximum number of apply.");
    }

    // max_apply ile toplam açılma sayısı döndürülür
    // remaining 0'dan düşük olamaz eğer 0'dan düşükse 0 olarak döndürülür.
    if (checkListing.max_apply - totalOpened < 0) {
      return {
        max_apply: checkListing.max_apply,
        opened: totalOpened,
        remaining: 0,
      };
    }
    return {
      max_apply: checkListing.max_apply,
      opened: totalOpened,
      remaining: checkListing.max_apply - totalOpened,
    };
  }

  // Category Operations
  async getListingsbyCategory(page, limit, category_id, user_id) {
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const unfollowed = await this.getUserUnfollowedListings(user_id);

    const { count, rows } = await Listings.findAndCountAll({
      where: {
        id: {
          [Op.notIn]: unfollowed.length > 0 ? unfollowed : [0],
        },
        is_active: true,
        category_id: parseInt(category_id),
      },
      include: [
        {
          model: UserFollowListings,
          attributes: ["is_following"],
          required: false,
        },
        {
          model: User,
        },
        {
          model: ListingCategories,
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return {
      data: rows,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      currentLimit: parseInt(limit),
    };
  }
  async searchListingbyCategory(user_id, category_id, search, page = 1, limit = 10) {
    if (!category_id) throw new Error("Category not found.");

    const category = await listingCategoryService.getById(parseInt(category_id));
    if (!category) throw new Error("Category not found.");

    if (!search) throw new Error("Search keyword must be required.");
    if (search.length < 3) throw new Error("Search keyword must be at least 3 characters.");

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const unfollowed = await this.getUserUnfollowedListings(user_id);
    let whereClause = {
      id: {
        [Op.notIn]: unfollowed.length > 0 ? unfollowed : [0],
      },
      is_active: true,

      category_id: parseInt(category_id),
      [Op.or]: [
        {
          description: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    };

    const { count, rows } = await Listings.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: UserFollowListings,
          where: {
            user_id: user_id,
          },
          attributes: ["is_following"],
          required: false,
        },
        {
          model: User,
        },
        {
          model: ListingCategories,
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return {
      data: rows,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      currentLimit: parseInt(limit),
    };
  }

  // Search Listing by Postcode and Radius
  async searchListingByPostcodeAndRadius(user_id, spesific_post_code, spesific_max_mile = 10, search, page = 1, limit = 10) {
    if (!spesific_post_code) throw new Error("Postcode must be required.");
    if (!search) throw new Error("Search keyword must be required.");
    if (search.length < 3) throw new Error("Search keyword must be at least 3 characters.");

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const unfollowed = await this.getUserUnfollowedListings(user_id);
    let whereClause = {
      id: {
        [Op.notIn]: unfollowed.length > 0 ? unfollowed : [0],
      },
      is_active: true,

      [Op.or]: [
        {
          description: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    };

    if (spesific_post_code && spesific_max_mile) {
      const postcodeDetail = await postCodesService.getLatLongFromPostcode(spesific_post_code);
      if (!postcodeDetail) throw new Error("Postcode not found.");
      const radius = spesific_max_mile * 1609.34;
      whereClause[Op.and] = sequelize.literal(`ST_Distance_Sphere(point(longitude, latitude), point(${postcodeDetail.longitude}, ${postcodeDetail.latitude})) <= ${radius}`);
    }

    const { count, rows } = await Listings.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: UserFollowListings,
          attributes: ["is_following"],
        },
        {
          model: User,
        },
        {
          model: ListingCategories,
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return {
      data: rows,
      spesific_max_mile: parseInt(spesific_max_mile),
      spesific_post_code,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      currentLimit: parseInt(limit),
    };
  }

  // Helper function
  async filterListings(listings) {
    return await listings.filter((listing) => {
      if (listing.user_follow_listings.length === 0) {
        return true;
      }

      return listing.user_follow_listings.some((follow) => follow.is_following);
    });
  }
  async getUserUnfollowedListings(user_id) {
    const unfollowed = await UserFollowListings.findAll({
      where: {
        user_id,
        is_following: false,
      },
      attributes: ["listing_id"],
    });
    let unfollowedListingsIds = [];
    if (unfollowed.length > 0) {
      unfollowedListingsIds = unfollowed.map((u) => u.listing_id);
    }
    return unfollowedListingsIds;
  }
}

module.exports = ListingsService;
