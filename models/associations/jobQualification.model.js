const jobQualificationCategories = require("../jobQualificationCategories.model");
const jobQualification = require("../jobQualifications.model");
const JobHaveQualifications = require("../jobHaveQualifications.model");
const Jobs = require("../jobs.model");

jobQualificationCategories.hasMany(jobQualification, { foreignKey: "category_id" });
jobQualification.belongsTo(jobQualificationCategories, { foreignKey: "category_id" });

jobQualification.hasMany(JobHaveQualifications, { foreignKey: "qualification_id" });
JobHaveQualifications.belongsTo(jobQualification, { foreignKey: "qualification_id" });

Jobs.hasMany(JobHaveQualifications, { foreignKey: "job_id" });
JobHaveQualifications.belongsTo(Jobs, { foreignKey: "job_id" });
