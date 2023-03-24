import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import { Events, animateScroll as scroll, scrollSpy } from 'react-scroll'
import { Badge, Button } from 'react-bootstrap'
import { push } from 'connected-react-router'
import jQuery from 'jquery'
import LookupTabs from 'Lookup/LookupTabs'
import LookupAddressDisplay from 'Lookup/LookupAddressDisplay'
import BaseLink from 'shared/components/BaseLink'
import { geographyToLink } from 'shared/utilities/routeUtils'
import { fireSwitchLookupTableEvent } from 'Store/Analytics/actions'
import { setAppState } from 'Store/AppState/actions'
import LookupTable from 'Lookup/LookupTable'
import BuildingSelect from 'Lookup/BuildingSelect'
import LookupLinks from 'Lookup/LookupLinks'
import LookupSidebar from 'Lookup/LookupSidebar'
import BookmarkButton from 'shared/components/buttons/BookmarkButton'
import LoginButton from '../../shared/components/buttons/LoginButton'
import { bookmarkProperty, unBookmarkProperty, getUserBookmarkedProperties } from 'Store/MyDashboard/actions'
import { boroCodeToName, constructAddressString } from 'shared/utilities/languageUtils'
import { requestWithAuth } from 'shared/utilities/authUtils'
import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'
import { toast } from 'react-toastify'
import ModalContext from 'Modal/ModalContext'
import UserContext from 'Auth/UserContext'

import './style.scss'

class LookupShow extends React.PureComponent {
  constructor(props) {
    super(props)

    if (this.props.propertyError && this.props.propertyError.status === 404) {
      this.props.trigger404Error(`Property with bbl: ${this.props.bbl} not found.`)
    }

    this.state = {
      userBookmarks: this.props.userBookmarks,
      bookmarked: this.props.userBookmarks && !!this.props.userBookmarks[this.props.bbl]
    }

    this.switchTable = this.switchTable.bind(this)
    this.handleClearLookup = this.handleClearLookup.bind(this)
    this.bookmarkClicked = this.bookmarkClicked.bind(this)
    this.handleSuccessfulBookmarkAction = this.handleSuccessfulBookmarkAction.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userBookmarks !== prevState.userBookmarks) {
      return {
        userBookmarks: nextProps.userBookmarks,
        bookmarked: nextProps.userBookmarks && nextProps.userBookmarks[nextProps.bbl]
      }
    }
    return null;
  }

  handleSuccessfulBookmarkAction(verb) {
    toast.success(`Successfully ${verb} this property`)
    this.props.dispatch(requestWithAuth(getUserBookmarkedProperties()));
  }

  bookmarkClicked() {
    if (this.props.bookmarkLoading || this.props.bookmarkDeleteLoading) return;

    if (!this.state.bookmarked) {
      const address = constructAddressString({
        street: this.props.propertyResult.address,
        borough: boroCodeToName(this.props.propertyResult.borough),
        zip: this.props.propertyResult.zipcode,
      });
      this.props.dispatch(requestWithAuth(bookmarkProperty(
        this.props.bbl, address, () => this.handleSuccessfulBookmarkAction("bookmarked")
      )));
    }
    else {
      const areYouSure = confirm("Are you sure you want to delete this bookmark?");
      if (!areYouSure) return;
      this.props.dispatch(requestWithAuth(unBookmarkProperty(
        this.props.userBookmarks[this.props.bbl].id,
        () => this.handleSuccessfulBookmarkAction("unbookmarked")
      )));
    }
  }

  componentDidMount() {


    scrollSpy.update()
    scroll.scrollToTop({
      duration: 500,
      delay: 0,
      smooth: 'easeInOutQuart',
    })

    this.props.dispatch(
      setAppState({
        selectedRequest: this.props.lookupRequests[0],
      })
    )

    // Decide position of Address/Bookmark based on screen width
    if (window.innerWidth > 575) {
      jQuery('.lookup-show__row-wrapper').prependTo('.lookup-show__content')
    }
    else {
      jQuery('.lookup-show__row-wrapper').appendTo('.mobile-address')
    }

    // Decide position of Address/Bookmark based on screen width on resize
    window.addEventListener("resize", updateLayout, false);

    function updateLayout() {
      if (window.innerWidth > 575) {
        jQuery('.lookup-show__row-wrapper').prependTo('.lookup-show__content')
      }
      else {
        jQuery('.lookup-show__row-wrapper').appendTo('.mobile-address')
        // }
      }
    }
  }


  componentWillUnmount() {
    Events.scrollEvent.remove('begin')
    Events.scrollEvent.remove('end')
  }

  componentDidUpdate() {
    if (
      !this.props.loadingState[this.props.profileRequest.requestConstant] &&
      this.props.bin &&
      Object.keys(this.props.propertyResult).length &&
      !this.props.propertyResult.buildings.some(b => b.bin === this.props.bin)
    ) {
      this.props.changeLookup(this.props.bbl, undefined)
    }

    if (this.props.propertyError && this.props.propertyError.status === 404) {
      this.props.trigger404Error(`Property with bbl: ${this.props.bbl} not found.`)
    }

    // Redirect user back to tax lot if landing on page from 1 building address
    if (
      !this.props.loadingState[this.props.profileRequest.requestConstant] &&
      (this.props.propertyResult.buildings || []).length == 1 &&
      this.props.bin
    ) {
      this.props.changeLookup(this.props.propertyResult.bbl, undefined)
    }
  }

  handleClearLookup() {
    this.props.dispatch(setAppState({ currentProperty: undefined, currentBuilding: undefined }))
    this.props.dispatch(push('/lookup'))
  }

  switchTable(request) {
    this.props.dispatch(fireSwitchLookupTableEvent(request.resourceModel.label))
    this.props.dispatch(
      setAppState({
        selectedRequest: request,
      })
    )
  }

  isBuildingView() {
    return !!this.props.bin
  }

  render() {


    const isLoggedIn = this.props.loggedIn
    let bookmark;

    if (isLoggedIn) {
      bookmark = <BookmarkButton
        active={this.state.bookmarked}
        activeText="You have bookmarked this property"
        text="Bookmark this property"
        onBookmark={this.bookmarkClicked}
        disabled={this.props.bookmarkLoading || this.props.bookmarkDeleteLoading}
      />;
    } else {
      bookmark =
        <UserContext.Consumer>
          {auth => (
            <div>
              <ModalContext.Consumer>
                {modal => {
                  return <LoginButton
                    modal={modal}
                    auth={auth}
                    active={this.state.bookmarked}
                    activeText="You have bookmarked this property"
                    text="Login to bookmark this property"
                    onBookmark={this.bookmarkClicked}
                    disabled={this.props.bookmarkLoading || this.props.bookmarkDeleteLoading} />
                }}
              </ModalContext.Consumer>
            </div>
          )}
        </UserContext.Consumer>
    }


    return (
      <div className="lookup-show layout-width-wrapper">
        <div className="lookup-show__content-wrapper">
          {/*Insert Address Here*/}
          <LookupSidebar
            appState={this.props.appState}
            error={this.props.errorState[this.props.profileRequest.requestConstant]}
            loading={this.props.loadingState[this.props.profileRequest.requestConstant]}
            profileRequest={this.props.profileRequest}
            propertyResult={this.props.propertyResult}
          />
          <div className="lookup-show__content">
            <div className="lookup-show__row-wrapper">
              <div className="lookup-show__top-row">
                <div className="lookup-show__bookmark-section">
                  {bookmark}
                </div>
                <LookupAddressDisplay handleClear={this.handleClearLookup} profile={this.props.propertyResult} />


                {(this.props.bookmarkLoading || this.props.bookmarkDeleteLoading) &&
                  <div><SpinnerLoader size="20px" /></div>
                }
                {(this.props.bookmarkError) && (
                  <div className="lookup-show__bookmark-error">
                    {this.props.bookmarkError.message}
                  </div>
                )}
                {(this.props.bookmarkDeleteError) && (
                  <div className="lookup-show__bookmark-error">
                    {this.props.bookmarkDeleteError.message}
                  </div>
                )}
                {this.props.appState.linkLookupBackToDashboard && (
                  <BaseLink
                    className="lookup-show__back-to-dashboard"
                    href={`../../../../district-dashboard` +
                      geographyToLink(
                        this.props.appState.currentGeographyType,
                        this.props.appState.currentGeographyId
                      )
                    }
                  >
                    <Button className="icon-button--right backtodashboard" variant="dark" size="sm">
                      Back to dashboard <FontAwesomeIcon icon={faChevronLeft} size="sm" />
                    </Button>
                  </BaseLink>
                )}

              </div>
              <div className="lookup-show__building-row">
                <BuildingSelect
                  bbl={this.props.bbl}
                  bin={this.props.bin}
                  changeLookup={this.props.changeLookup}
                  propertyResult={this.props.propertyResult}
                />
              </div>
            </div>
            <LookupTabs
              appState={this.props.appState}
              dispatch={this.props.dispatch}
              isBuildingView={!!this.props.bin}
              errorState={this.props.errorState}
              loadingState={this.props.loadingState}
              requests={this.props.requests}
              lookupRequests={this.props.lookupRequests}
              switchTable={this.switchTable}
              propertyResult={this.props.propertyResult}
            />
            <div className="lookup-show__tables">
              {this.props.lookupRequests.map(request => {
                return (
                  <LookupTable
                    badge={
                      request.level === 'PROPERTY' || !this.props.bin ? (
                        <Badge className="tab-color--primary">Tax Lot Data</Badge>
                      ) : (
                        <Badge className="tab-color--secondary">Building Data</Badge>
                      )
                    }
                    loading={this.props.loadingState[request.requestConstant]}
                    property={this.props.propertyResult}
                    bin={this.props.appState.currentBuilding}
                    caption={request.resourceModel.label}
                    key={`lookup-table-${request.resourceModel.resourceConstant}`}
                    visible={this.props.appState.selectedRequest === request}
                    request={request}
                  />
                )
              })}
            </div>
            <div className="lookup-show__links">
              <LookupLinks property={this.props.propertyResult} bin={this.props.appState.currentBuilding} />
            </div>
          </div>
        </div>
      </div >
    )
  }
}

LookupShow.defaultProps = {
  propertyResult: {},
}

LookupShow.propTypes = {
  appState: PropTypes.object,
  loadingState: PropTypes.object,
  dispatch: PropTypes.func,
  bin: PropTypes.string,
  requests: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  changeLookup: PropTypes.func,
  propertyResult: PropTypes.object,
  profileRequest: PropTypes.object,
  loggedIn: PropTypes.bool,
  userBookmarks: PropTypes.object,
}

export default LookupShow
