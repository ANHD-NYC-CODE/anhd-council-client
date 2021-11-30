import React from 'react'

const DataAccessPolicy = props => {
  return (
    <div className="container p-3">
      <h1 className="mt-3 mb-3">Data Access Policy</h1>
      <p className="mb-3">
        Because of the sensitive nature of housing court 
        and foreclosures data, we limit access to this 
        data to users who are:
      </p>
      <ol className="mb-3">
        <li>
          Staff of ANHD member organizations
        </li>
        <li>
          New York City and State elected officials and their staff, 
          members of community boards, and staff of government agencies  
        </li>
      </ol>
      <p className="mb-3">
        Users must request accounts from their appropriate .gov or .org 
        email addresses to be granted an account.
      </p>
      <p className="mb-3">
        We will also consider requests from partner and allied organizations 
        or individuals who are using this data to stop speculation and 
        displacement and/or further tenant and small homeowner rights and who 
        are not profiting from its use. Examples of uses that may be approved
        under this category at the discretion of ANHD include:
      </p>
      <ul className="mb-3">
        <li>
          Academic or policy research 
        </li>
        <li>
          Community/tenant organizing 
        </li>
      </ul>
      <p className="mb-3">
        If you would like to access DAP Portal foreclosures and housing court
        data and do not fall under user category 1 or 2, you may send a 
        request and you must include your organization and how you plan 
        to use this data. 
      </p>
      <p className="mb-3">
        Use of this data for profit or commercial gain is explicitly prohibited
        and will not be approved. Use of this data for commercial real estate
        uses (by brokers, investors, sales agents, etc) is prohibited and 
        will not be approved. 
      </p>
      <p className="mb-3">
        Use of this data for profit, personal, or commercial gain is explicitly 
        prohibited and will not be approved. Use of this data for commercial 
        real estate uses (by brokers, investors, sales agents, etc) is 
        prohibited and will not be approved. 
      </p>
      <p className="mb-3">
        When requesting an account, users must affirm that they:
      </p>
      <ul className="mb-3">
        <li>
          will not use this data for profit, personal, or commercial gain.
        </li>
        <li>
          will not use this data to discriminate against any person based on
          race, gender, race, color, religion, national origin, gender, 
          marital status, sexual orientation, age, disability, 
          veteran status, or any other characteristic protected by federal, 
          state, or local law.
        </li>
        <li>
          will not use this data to directly or indirectly displace any person.
        </li>
      </ul>
      <p className="mb-3">
        Misuse of the data will result in revocation of access. Any 
        redistribution of this data is subject to the same terms 
        and restrictions.
      </p>
      <p className="mb-3">
        ANHD may grant, deny, and/or revoke access to the DAP Portal 
        in its sole discretion for any reason. ANHD may, but is not 
        required to, institute an appeals process for individuals 
        to have their applications for access to the DAP Portal reconsidered.
      </p>
    </div>
  )
}

export default DataAccessPolicy