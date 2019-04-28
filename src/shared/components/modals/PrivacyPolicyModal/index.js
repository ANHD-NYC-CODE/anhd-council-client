import React from 'react'
import PropTypes from 'prop-types'
import BaseModal from 'shared/components/BaseModal'
import * as c from 'shared/constants'
import { Table } from 'react-bootstrap'
const Component = props => {
  return (
    <BaseModal
      centered={true}
      labelId={props.labelId}
      modalFooter={props.modalFooter}
      hideModal={props.hideModal}
      show={props.show}
      size={props.size}
      title="Analytics"
    >
      <p className="text-dark">
        This site uses{' '}
        <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer">
          Google Analytics
        </a>{' '}
        to help us better understand how it's used.
      </p>
      <p>
        We've configured it to anonymize your IP address and not send any personally identifiable information to Google,
        such as your email address, name, or username.
      </p>
      <p>
        We hope that collecting these analytics will help us make good decisions on how to improve the site for
        everyone.
      </p>
      <p>
        If you have any questions, feel free to reach out to{' '}
        <a href={`mailto:${c.CONTACT_EMAIL}`}>anhd.tech@gmail.com</a>
      </p>
      <p>
        The code for this website is open and available on{' '}
        <a href="https://github.com/ANHD-NYC-CODE/anhd-council-client" target="_blank" rel="noopener noreferrer">
          Github
        </a>
        .
      </p>
      <p>Here is a list of the events we currently track:</p>
      <Table bordered>
        <thead>
          <tr>
            <th>Event</th>
            <th>Intent</th>
            <th>Date Collected</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Opening this modal</td>
            <td>See specifically how many people care to read this information about analytics.</td>
            <td>Just the event</td>
          </tr>
          <tr>
            <td>Login</td>
            <td>See generally how many people login to use the site.</td>
            <td>The ID # of the user</td>
          </tr>
          <tr>
            <td>CSV Download</td>
            <td>See generally how many people use the CSV feature and specifically what CSVs are most popular.</td>
            <td>The auto-generated file name of the CSV</td>
          </tr>
          <tr>
            <td>Filter selection on district dashboard and property lookup.</td>
            <td>See specifically which filters in district dashboard are most popular.</td>
            <td>The name of the filter (ex: HPD Violations)</td>
          </tr>
          <tr>
            <td>Date selection on district dashboards</td>
            <td>See specifically which dates in district dashboard are most popular.</td>
            <td>The value of the date (ex: last 3 years)</td>
          </tr>
          <tr>
            <td>Custom Search submission</td>
            <td>See generally how many people use the custom search and specifically what queries they create.</td>
            <td>A sentence summarizing the constructed search query.</td>
          </tr>
          <tr>
            <td>Custom Search filter added</td>
            <td>See specifically which filters are most popular in custom search.</td>
            <td>The name of the filter (ex: HPD Violations)</td>
          </tr>
          <tr>
            <td>Custom Search condition switched</td>
            <td>See specifically which logical conditions are most used.</td>
            <td>The name of the condition (ex: AND, or OR)</td>
          </tr>
          <tr>
            <td>Custom Search condition group added</td>
            <td>See generally how often people use one of the more complicated features of custom search.</td>
            <td>Just the event</td>
          </tr>
        </tbody>
      </Table>
    </BaseModal>
  )
}

Component.propTypes = {}

export default Component
