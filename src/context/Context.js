import { createContext, useState } from "react";
import axios from "../api/axios";

const Context = createContext({})

export const ContextProvider = ({ children }) => {

    const localUser = JSON.parse( localStorage.getItem('user'))

    const [ user, setUser ] = useState( localUser )

    const [ lastYear, setLastYear ] = useState({})

    const getLastYear = async _ => {
        await axios('/year/current')
        .then( res => setLastYear( res.data.data ))
        .catch( error => console.log( error ))
    }

    // academic year
    const [ academicYears, setAcademicYears ] = useState([])
    const [ currentAcademicYear, setCurrentAcademicYear ] = useState({})
    const getAcademicYears = async _ => {
        await axios('/year/list')
        .then( res => setAcademicYears( res.data.data ))
        .catch( error => console.log( error ))
    }

    // enseignants
    const [ professors, setProfessors ] = useState([])
    const [ currentProfessor, setCurrentProfessor ] = useState({})
    const getProfessors = async _ => {
        await axios('/professor/list')
        .then( res => setProfessors( res.data.data ))
        .catch( error => console.log( error ))
    }

    // subjects
    const [ subjects, setSubjects ] = useState([])
    const [ currentSubject, setCurrentSubject ] = useState({})
    const getSubjects = async _ => {
        await axios('/subject/list')
        .then( res => setSubjects( res.data.data ))
        .catch( error => console.log( error ))
    }

    // students
    const [ students, setStudents ] = useState([])
    const [ currentStudent, setCurrentStudent ] = useState({})
    const getStudents = async _ => {
        await axios('/student/list')
        .then( res => setStudents( res.data.data ))
        .catch( error => console.log( error ))
    }

    // schoolFees
    const [ schoolFees, setSchoolFees ] = useState([])
    const [ currentSchoolFees, setCurrentSchoolFees ] = useState({})
    const getSchoolFees = async _ => {
        await axios('/school-fees/list')
        .then( res => setSchoolFees( res.data.data ))
        .catch( error => console.log( error ))
    }

    // schedules
    const [ schedules, setSchedules ] = useState([])
    const [ currentSchedule, setCurrentSchedule ] = useState({})
    const getSchedules = async _ => {
        await axios('/schedule/list')
        .then( res => setSchedules( res.data.data ))
        .catch( error => console.log( error ))
    }

    const [ currentLevel, setCurrentLevel ] = useState({})

    return(
        <Context.Provider
            value = {{

                // user
                user,
                setUser,

                // professors
                getProfessors,
                professors,
                currentProfessor,
                setCurrentProfessor,

                // subjects
                getSubjects,
                subjects,
                currentSubject,
                setCurrentSubject,

                // students
                getStudents,
                students,
                currentStudent,
                setCurrentStudent,

                // schoolFees
                getSchoolFees,
                schoolFees,
                currentSchoolFees,
                setCurrentSchoolFees,

                // schedules
                getSchedules,
                schedules,
                currentSchedule,
                setCurrentSchedule,

                // academicYears
                getAcademicYears,
                academicYears,
                currentAcademicYear,
                setCurrentAcademicYear,
                getLastYear,
                lastYear, 
                setLastYear,

                // level
                currentLevel,
                setCurrentLevel
            }}
        >
            { children }
        </Context.Provider>
    )
}


export default Context