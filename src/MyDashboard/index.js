import React from 'react'
import PropTypes from 'prop-types'
import BookmarkButton from 'shared/components/buttons/BookmarkButton'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons"
import { getNotificationFrequencyString } from 'shared/utilities/sentenceUtils'
import { unBookmarkProperty, getUserBookmarkedProperties } from 'Store/MyDashboard/actions'
import { requestWithAuth } from 'shared/utilities/authUtils'
import SaveSearchButton from 'shared/components/buttons/SaveSearchButton'
import ModalContext from 'Modal/ModalContext'
import SaveOrEditCustomSearch from 'shared/components/modals/SaveCustomSearchModal'
import InfoModalButton from 'shared/components/InfoModalButton'
import RequestAccessModal from 'shared/components/modals/RequestAccessModal'
import { TRUSTED_GROUP } from 'shared/constants/groups'

import './style.scss'

class MyDashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        if(!this.props.user) {
            this.props.dispatch(push("/"));
        }
    }

    async onBookmarkDelete(id) {
        const areYouSure = confirm("Are you sure you want to delete this bookmark?");
        if (!areYouSure) return;
        
        await this.props.dispatch(requestWithAuth(unBookmarkProperty(id)));
        await this.props.dispatch(requestWithAuth(getUserBookmarkedProperties()))
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
            modalComponent: RequestAccessModal
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
                            <p>You are a trusted member</p>
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
                                    modalProps={{viewPolicy: true}}/>
                            </div>
                        }                        
                        </ModalContext.Consumer>
                    }
                </div>
                <div className="my_dashboard__bookmark_section">
                    <h5 className="my_dashboard__section_header"><b>Bookmarked Properties</b></h5>
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
                                                <button className="btn btn-light" onClick={async() => 
                                                    await this.onBookmarkDelete(bookmark.id)}
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
                                <th scope="col" className="col-8">Query name</th>
                                <th scope="col" className="col-2">Notifications</th>
                                <th scope="col" className="col-2">Frequency</th>
                                <th scope="col">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!!Object.values(this.props.savedCustomSearches).length && 
                                Object.values(this.props.savedCustomSearches).map((search) => {
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
    console.log(state.auth.user);
    return {
        appState: state.appState,
        userBookmarks: state.myDashboard.userBookmarks,
        savedCustomSearches: state.myDashboard.customSearches,
        user: state.auth.user,
    }
}

export default connect(mapStateToProps)(MyDashboard)
