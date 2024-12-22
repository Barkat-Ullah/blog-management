import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Search functionality
  search(searchableFields: string[]) {
    const search = this.query?.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  sortBy() {
    let sortBy = 'createdAt';
    if (this.query?.sortBy) {
      sortBy = this.query?.sortBy as string;
    }
    this.modelQuery = this.modelQuery.sort(sortBy);
    return this;
  }

  sortOrder() {
    let sortOrder = 'asc';
    if (this.query.sortOrder) {
      sortOrder = this.query.sortOrder as string;
    }
    let sortBy = 'createdAt';
    if (this.query?.sortBy) {
      sortBy = this.query?.sortBy as string;
    }
    this.modelQuery = this.modelQuery.sort({
      [sortBy]: sortOrder === 'asc' ? 1 : -1,
    });
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['search', 'sortBy', 'sortOrder'];
    excludeFields.forEach((el) => delete queryObj[el]);

    if (queryObj.author) {
      this.modelQuery = this.modelQuery.find({ author: queryObj.author });
    }

    this.modelQuery = this.modelQuery.find(queryObj); // Apply the filter to the remaining fields
    return this;
  }
}
export default QueryBuilder