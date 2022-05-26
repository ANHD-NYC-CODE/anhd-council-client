import React from 'react'
import PropTypes from 'prop-types'
import BookmarkButton from 'shared/components/buttons/BookmarkButton'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faEdit, faQuestion } from "@fortawesome/free-solid-svg-icons"
import { getNotificationFrequencyString, getReadableDateTimeString } from 'shared/utilities/sentenceUtils'
import { unBookmarkProperty, getUserBookmarkedProperties } from 'Store/MyDashboard/actions'
import { requestWithAuth } from 'shared/utilities/authUtils'
import SaveSearchButton from 'shared/components/buttons/SaveSearchButton'
import ModalContext from 'Modal/ModalContext'
import SaveOrEditCustomSearch from 'shared/components/modals/SaveCustomSearchModal'
import InfoModalButton from 'shared/components/InfoModalButton'
import RequestAccessModal from 'shared/components/modals/RequestAccessModal'
import { TRUSTED_GROUP } from 'shared/constants/groups'
import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'
import * as c from "Store/MyDashboard/constants";
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { toast } from 'react-toastify'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import './style.scss'

const createdDateStartDT = '2022-05-05'

class MyDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.onBookmarkDelete = this.onBookmarkDelete.bind(this);
        this.onSuccessfulBookmarkDelete = this.onSuccessfulBookmarkDelete.bind(this);
    }

    componentDidUpdate() {
        if(!this.props.user) {
            this.props.dispatch(push("/"));
        }
    }

    onSuccessfulBookmarkDelete() {
        toast.success("Successfuly deleted bookmarked property");
        this.props.dispatch(requestWithAuth(getUserBookmarkedProperties()))
    }

    onBookmarkDelete(id) {
        const areYouSure = confirm("Are you sure you want to delete this bookmark?");
        if (!areYouSure) return;
        this.props.dispatch(requestWithAuth(unBookmarkProperty(
            id, this.onSuccessfulBookmarkDelete
        )));
    }

    onEditSavedCustomSearch(e, modal, search) {
        e.preventDefault()
        const notifications = search.notification_frequency !== "N";
        modal.setModal({
          modalComponent: SaveOrEditCustomSearch,
          modalProps: {
            editing: true,
            id: search.id,
            url: search.custom_search_view,
            notificationFrequency: notifications ? search.notification_frequency : undefined,
            queryName: search.name,
            notifications
          }
        })
    }

    onRequestAccess(e, modal) {
        e.preventDefault()
        modal.setModal({
            modalComponent: RequestAccessModal,
            modalProps: {
                userAccessRequestStatus: this.props.user.accessRequestStatus
            }
        })
    }

    render() {
        return (
            <div className="my_dashboard__container container-fluid">
                <div className="my_dashboard__top_section">
                    <div className="my_dashboard__welcome_message">
                        <h4>
                            Welcome, <b>{this.props.user && this.props.user.username}</b>
                        </h4>
                        {!!this.props.user && this.props.user.groups.includes(TRUSTED_GROUP) && (
                            <p>
                                You have access to protected housing court and foreclosures data.
                                <a href="https://portal.displacementalert.org/policies/data-access-policy"> View the full data access policy</a>
                            </p>
                        )}
                    </div>
                    {!!this.props.user && !this.props.user.groups.includes(TRUSTED_GROUP) &&
                        <ModalContext.Consumer>
                        {modal => 
                            <div className="d-flex align-items-center">
                                <button className="btn-sm btn-dark mr-3" onClick={e => this.onRequestAccess(e, modal)}>
                                    Request access to housing court and foreclosures data
                                </button>
                                <InfoModalButton 
                                    modalComponent={RequestAccessModal}
                                    modalProps={{viewPolicy: true, userAccessRequestStatus: this.props.user.accessRequestStatus}}/>
                            </div>
                        }                        
                        </ModalContext.Consumer>
                    }
                </div>
                <div className="my_dashboard__bookmark_section">
                    <div className="d-flex flex-row justify-content-">
                        <div><h5 className="my_dashboard__section_header"><b>Bookmarked Properties</b></h5></div>
                        {(this.props.bookmarkDeleteLoading) && 
                            <div><SpinnerLoader size="20px" className="ml-3"/></div>
                        }
                        {(this.props.bookmarkDeleteError) && (
                            <div className="lookup-show__bookmark-error ml-3">
                                {this.props.bookmarkDeleteError.message}
                            </div>
                        )}
                    </div>
                    <table className="table table-striped table-sm">
                        <thead className="">
                            <tr className="">
                                <th scope="col" className="col-10">Property Address</th>
                                <th scope="col" className="col-2">BBL</th>
                                <th scope="col">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!!Object.values(this.props.userBookmarks).length && (
                                Object.values(this.props.userBookmarks).map((bookmark) => {
                                    return (
                                        <tr key={bookmark.bbl}>
                                            <th scope="row">
                                                <Link to={"/property/"+bookmark.bbl}>
                                                    <BookmarkButton active={true} text={bookmark.name} />
                                                </Link>
                                            </th>
                                            <td>
                                                {bookmark.bbl}
                                            </td>
                                            <td>
                                                <button className="btn btn-light" onClick={() => 
                                                    this.onBookmarkDelete(bookmark.id)}
                                                    disabled={this.props.bookmarkDeleteLoading}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} size="lg" />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                    {!Object.values(this.props.userBookmarks).length && (
                        <div className="my_dashboard__empty_section_message">
                            You have not bookmarked any properties.
                        </div>
                    )}
                </div>
                <div className="my_dashboard__search_section">
                    <h5 className="my_dashboard__section_header"><b>Saved Custom Searches</b></h5>
                    <table className="table table-striped table-sm">
                        <thead className="">
                            <tr className="">
                                <th scope="col" className="col-5">Query name</th>
                                <th scope="col" className="col-1">Notifications</th>
                                <th scope="col" className="col-1">Frequency</th>
                                <th scope="col" className="col-2">
                                    Saved on
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={props => (
                                            <Tooltip id="button-tooltip" {...props}>
                                                If a date and time is not available, the search was saved before we added date/times to My Dashboard on May 5 2022.
                                            </Tooltip>
                                        )}
                                    >
                                        <FontAwesomeIcon className="info-modal-button info-modal-button--tooltip" icon={faQuestion} size="sm" />
                                    </OverlayTrigger>
                                </th>
                                <th scope="col" className="col-1">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!!Object.values(this.props.savedCustomSearches).length && 
                                Object.values(this.props.savedCustomSearches).sort((i, j) => { return Date.parse(i.created_date) <= Date.parse(j.created_date) }).map((search) => {
                                    return (
                                        <tr key={search.id}>
                                            <th scope="row">
                                                <Link to={"/search"+search.custom_search_view}>
                                                    <SaveSearchButton active={true} text={search.name} />
                                                </Link>
                                            </th>
                                            <td>
                                                {search.notification_frequency === "N" ? "Off" : "On"}
                                            </td>
                                            <td>
                                                {getNotificationFrequencyString(search.notification_frequency)}
                                            </td>
                                            <td>
                                                {search.created_date.slice(0, 10) === createdDateStartDT ? <span className="font-italic">N/A</span> : getReadableDateTimeString(search.created_date)}
                                            </td>
                                            <td>
                                                <ModalContext.Consumer>
                                                {modal => 
                                                    <button className="btn btn-light" onClick={(e) => 
                                                        this.onEditSavedCustomSearch(e, modal, search)
                                                    }>
                                                        <FontAwesomeIcon icon={faEdit} size="lg" />
                                                    </button>
                                                }
                                                </ModalContext.Consumer>
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                    {!Object.values(this.props.savedCustomSearches).length && (
                        <div className="my_dashboard__empty_section_message">
                            You have not saved any custom searches.
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

MyDashboard.propTypes = {
    auth: PropTypes.object,
    path: PropTypes.string,
}

const mapStateToProps = state => {
    const bookmarkDeleteError = createErrorSelector([c.UNBOOKMARK_PROPERTY]);
    const bookmarkDeleteLoading = createLoadingSelector([c.UNBOOKMARK_PROPERTY]);

    return {
        appState: state.appState,
        userBookmarks: state.myDashboard.userBookmarks,
        savedCustomSearches: state.myDashboard.customSearches,
        user: state.auth.user,
        bookmarkDeleteError: bookmarkDeleteError(state),
        bookmarkDeleteLoading: bookmarkDeleteLoading(state),
    }
}

export default connect(mapStateToProps)(MyDashboard)
