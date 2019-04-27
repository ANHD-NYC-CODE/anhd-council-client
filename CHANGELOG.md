#### 1.0.0b1.0.0

4/25/19

- Reimplement basic csv export using client's bootstrap-table-2 features rather than backend django export.
- Add \$ dollar formatter to Acris `docamount` table column.
- add `ENABLE_PRINT` feature flag to `constants/config` and set to `false` - hides all print buttons. (Print feature is not ready.)
- Add extended property table columns for dataset date range + counts and added `latestsaleprice` column.
- Remove `bldgclass`, `numfloors`, and `numbldgs` columns from property tables.

#### 1.0.0b1.0.1

4/26/19

- Add Foreclosure card to district dashboard
- Added a post-login action to redo all authenticated data requests upon login.
- Added post-logout redirect to main '/' to clear authenticated data from page.
- configured front end tables and filter cards to handle a response with `annotation_start=full`. This response contains a full annotation with all 3 annotation thresholds in a single request.
