#### 1.0.0b1

4/25/19

- Reimplement basic csv export using client's bootstrap-table-2 features rather than backend django export.
- Add \$ dollar formatter to Acris `docamount` table column.
- add `ENABLE_PRINT` feature flag to `constants/config` and set to `false` - hides all print buttons. (Print feature is not ready.)
- Add extended property table columns for dataset date range + counts and added `latestsaleprice` column.
- Remove `bldgclass`, `numfloors`, and `numbldgs` columns from property tables.
