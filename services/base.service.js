class BaseService {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const record = await this.model.create(data);
      return record;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      console.log("girdi");
      const record = await this.model.findByPk(parseInt(id));
      return record;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const records = await this.model.findAll();
      return records;
    } catch (error) {
      throw error;
    }
  }
  async getAllwithCondition(condition = {}) {
    try {
      const records = await this.model.findAll({ where: condition });
      return records;
    } catch (error) {
      throw error;
    }
  }

  async getWithCondition(condition = {}) {
    try {
      const record = await this.model.findOne({ where: condition });
      return record;
    } catch (error) {
      throw error;
    }
  }

  async countwithCondition(condition = {}) {
    try {
      const total = await this.model.count({ where: condition });
      return total;
    } catch (error) {
      throw error;
    }
  }

  async getAllWithPagination(page = 1, limit = 10, condition = {}) {
    try {
      const offset = (parseInt(page) - 1) * parseInt(limit);
      const totalCount = await this.model.count();
      const records = await this.model.findAll({
        limit: parseInt(limit),
        offset: offset,
        where: condition,
        order: [["created_at", "DESC"]],
      });

      return {
        data: records,
        currentPage: parseInt(page),
        currentLimit: parseInt(limit),
        total: totalCount,
        totalPages: Math.ceil(totalCount / parseInt(limit)),
      };
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      await this.model.update(data, {
        where: {
          id: id,
        },
      });
      return await this.getById(id);
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const record = await this.getById(id);
      if (!record) throw new Error("Record not found");

      await record.destroy();
      return { message: "Record deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BaseService;
