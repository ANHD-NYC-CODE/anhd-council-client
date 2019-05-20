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
- configured front end tables and filter cards to handle a response with `annotation_start=full`. This response contains a full annotation with all 3 annotation thresholds in a single request. Improves speed and reduces # of requests needed for this page.
- Add loading spinners to form buttons on submit.
- Redesign HPD Registration table - displaying only latest registration and their contacts.
- Copy DAP Navbar styles.

#### 1.0.0b1.0.2

4/27/19

- Adds Google Analytics events to user login, csv download, filter and table selection, custom search actions.
- creates csv download filenames based on table parameters.
- Adds analytics modal to explain our tracking

#### 1.0.0b1.0.3

4/27/19

- Adds Google Analytics events to user login, csv download, filter and table selection, custom search actions.
- creates csv download filenames based on table parameters.
- Adds analytics modal to explain our tracking
- Adds Table Filter buttons to certain tables
- Add new copy to info modals.

#### 1.0.0b1.0.31

4/28/19

- Add selected lookup filters to CSV download filename
- remove more text filters from column headers
- separate DOB Complaint Category - Priority - Description columns
- add concatenated lispenden comments column
- add concatenated Acris parties column

#### 1.0.0b1.0.32

4/29/19

- Improve access token handling with timeout refresh, fixes login bug
- remove redirect to '/' on logout, instead re-request authenticated requests
- Add table subheaders in lookup to include link information
- Add "A3" and "DM" DOB permit filter type buttons.
- Remove duplicate foreclosure comments

#### 1.0.0b1.0.33

4/30/19

- change contact email
- create conjoined HPDComplaint & HPDProblem table, remove nesting.

#### 1.0.0b1.0.34

4/30/19

- small redesign of property lookup page, with more distinguishing characteristics for building vs tax lot data.

#### 1.0.0b1.0.351

4/30/19

- darken $info and $secondary color variables
- all percentages now 1 decimal place
- small style tweaks to dashboard date toggles
- fix lookup map icon bug
- set default custom search later date to today.
- repositioned info ? icons
- reordered property table columns
- reordered district indicator cards
- restyled property lookup geography labels
- add new copy and fields to user request modal

#### 1.0.0b1.0.352

5/1/19

- add map spinning loader
- change litigations sentence noun from

#### 1.0.0b1.0.353

5/3/19

- Fixes the order of years in the rent stabilization table in property lookup.
- Adds copy to HPD Complaint, Acris, and Litigation info modals describing the update schedule.

#### 1.0.0b1.0.354

5/10/19

- turn off autocomplete on the search bar form
- display \$0 instead of blank if table dollar cell has 0
- end geography changing state when a filter is clicked in district dashboard
- hide pagination buttons when total results < selected page size

#### 1.0.0b1.0.361

5/20/19

- fix address search bug where it crashes when 1 single digit is entered
- open DAP project links in same tab
- change foreclosure unauthorized cards to \$gray-400 color.
- hide building select when there's only 1 building or less.
