import { Query } from "mongoose";

class QueryBuilder<T> {
   public queryModel: Query<T[], T>;
   public query: Record<string, unknown>;

   constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
      this.queryModel = queryModel;
      this.query = query;
   }

   search(searchableFields: string[]) {
      const searchTerm = this?.query?.searchTerm;
      if (searchTerm) {
         this.queryModel = this.queryModel.find({
            $or: searchableFields.map((field) => ({
               [field]: { $regex: searchTerm, $options: "i" },
            })),
         });
      }

      return this;
   }
   filter() {
      const filterObj = { ...this.query };
      const excludedFields = ["searchTerm", "limit", "page", "sort", "fields"];
      excludedFields.forEach((el) => delete filterObj[el]);
      this.queryModel = this.queryModel.find(filterObj);
      return this;
   }
   sort() {
      const sort =
         (this?.query?.sort as string)?.split(",")?.join(" ") || "-createdAt";
      this.queryModel = this.queryModel.sort(sort);
      return this;
   }
   paginate() {
      const page = Number(this.query?.page) || 1;
      const limit = Number(this.query?.limit) || 10;
      const skip = (page - 1) * limit;
      this.queryModel = this.queryModel.skip(skip).limit(limit);
      return this;
   }
   fields() {
      const fields =
         (this.query?.fields as string)?.split(",")?.join(" ") || "-__v";
      this.queryModel = this.queryModel.select(fields);
      return this;
   }
}

export default QueryBuilder;
