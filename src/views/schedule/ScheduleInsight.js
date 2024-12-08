import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { Table, Space, Select } from 'antd'
import { AiOutlineDelete } from "react-icons/ai"
import { scheduleTableColumns } from "../../constant/tableColumns";
import useCustomContext from "../../hooks/useCustomContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { day, timeTable } from "../../constant/periode";

export default function ScheduleInsight(){

    const {
        schedules,
        getSchedules,
        getLastYear,
        lastYear
    } = useCustomContext()

    const [ selectedLevel, setSelectedLevel ] = useState( null )

    const navigate = useNavigate()

    useEffect(() => {
        getSchedules()
        getLastYear()
    }, [])

    const searchedData = schedules
    .filter( timeTable =>
        timeTable.Subject?.Level?.levelDesignation == selectedLevel
    )

    return(
        <CRow>
            <CCol xs = { 12 }>

                <CRow
                    className = "d-flex mx-3 none"
                    style = {{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}
                >
                    <CCol xs = { 6 }>

                        <Select
                            placeholder = "Niveau"
                            style = {{ width: '100%', height: 40 }}
                            className="none"
                            options = {
                                [{ label: "Choisissez un niveau", value: ''}]
                                .concat(
                                    ( Array.isArray( lastYear.Levels ) ? lastYear.Levels : [] ).map( level => ({
                                        label: level.levelDesignation,
                                        value: level.levelDesignation
                                    }))
                                )
                            }
                            onChange = { value => setSelectedLevel( value ) }
                            value = { selectedLevel }
                        />
                    </CCol>
                    <CCol xs = { 6 }>

                        <CButton
                            color = "danger"
                            className="text-white ms-2 none"
                            onClick = { _ => window.print() }
                        >
                            Imprimer
                        </CButton>

                        <CButton
                            color = "primary"
                            className="text-white ms-2 none"
                            onClick = { _ => navigate('/app/schedule') }
                        >
                            Retour
                        </CButton>

                    </CCol>
                </CRow>

                <CCard className="m-4 print">
                    <CCardHeader className="d-flex justify-content-center align-items-center"> HORAIRE { selectedLevel ? `: ${ selectedLevel }` : '' } </CCardHeader>
                    <CCardBody>
                        <table className="schedule-table">

                            <thead>
                                <tr>
                                    <th>Heure</th>
                                    <th>Lundi</th>
                                    <th>Mardi</th>
                                    <th>Mercredi</th>
                                    <th>Jeudi</th>
                                    <th>Vendredi</th>
                                    <th>Samedi</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <th className="hour">07H30 - 09H00</th>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 1 &&
                                                schedule.scheduleItemHour == 1
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 2 &&
                                                schedule.scheduleItemHour == 1
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 3 &&
                                                schedule.scheduleItemHour == 1
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 4 &&
                                                schedule.scheduleItemHour == 1
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 5 &&
                                                schedule.scheduleItemHour == 1
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 6 &&
                                                schedule.scheduleItemHour == 1
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                </tr>
                                <tr>
                                    <th className="hour">09H00 - 10H30</th>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 1 &&
                                                schedule.scheduleItemHour == 2
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 2 &&
                                                schedule.scheduleItemHour == 2
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 3 &&
                                                schedule.scheduleItemHour == 2
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 4 &&
                                                schedule.scheduleItemHour == 2
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 5 &&
                                                schedule.scheduleItemHour == 2
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 6 &&
                                                schedule.scheduleItemHour == 2
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                </tr>
                                <tr>
                                    <th className="hour">10H30 - 12H00</th>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 1 &&
                                                schedule.scheduleItemHour == 3
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 2 &&
                                                schedule.scheduleItemHour == 3
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 3 &&
                                                schedule.scheduleItemHour == 3
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 4 &&
                                                schedule.scheduleItemHour == 3
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 5 &&
                                                schedule.scheduleItemHour == 3
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 6 &&
                                                schedule.scheduleItemHour == 3
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                </tr>
                                <tr>
                                    <th className="hour">12H30 - 14H00</th>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 1 &&
                                                schedule.scheduleItemHour == 4
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 2 &&
                                                schedule.scheduleItemHour == 4
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 3 &&
                                                schedule.scheduleItemHour == 4
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 4 &&
                                                schedule.scheduleItemHour == 4
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 5 &&
                                                schedule.scheduleItemHour == 4
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 6 &&
                                                schedule.scheduleItemHour == 4
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                </tr>
                                <tr>
                                    <th className="hour">14H00 - 15H30</th>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 1 &&
                                                schedule.scheduleItemHour == 5
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 2 &&
                                                schedule.scheduleItemHour == 5
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 3 &&
                                                schedule.scheduleItemHour == 5
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 4 &&
                                                schedule.scheduleItemHour == 5
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 5 &&
                                                schedule.scheduleItemHour == 5
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 6 &&
                                                schedule.scheduleItemHour == 5
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                </tr>
                                <tr>
                                    <th className="hour">15H30 - 17H00</th>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 1 &&
                                                schedule.scheduleItemHour == 6
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 2 &&
                                                schedule.scheduleItemHour == 6
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 3 &&
                                                schedule.scheduleItemHour == 6
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 4 &&
                                                schedule.scheduleItemHour == 6
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 5 &&
                                                schedule.scheduleItemHour == 6
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                    <td>
                                        {
                                            searchedData.find( schedule =>
                                                schedule.scheduleItemDay == 6 &&
                                                schedule.scheduleItemHour == 6
                                            )?.Subject?.subjectName
                                        } 
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}