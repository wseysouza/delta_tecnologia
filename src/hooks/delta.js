import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Toast from 'react-native-root-toast';

import { api } from '../services/api';


const DeltaContext = createContext({})


export const DeltaProvider = ({children}) => {
    const [listStudents, setListStudents] = useState([])
    const [student, setStudent] = useState({})

    const getListStudent = async (clear) => {
        try {
            const { data } = await api.get("/Aluno");
            setListStudents(data.results);
            if(clear){
                setStudent({})
            }
        } catch (error) {
            console.warn("error >> ", error)
        }
    }

    const deleteStudent = async () => {
        try {
            await api.delete(`/Aluno/${id}`);
            Toast.show(
                `Aluno deletado com sucesso!!!`,
                {
                    duration: 10000,
                    position: Toast.positions.CENTER,
                    animation: true,
                    hideOnPress: true,
                    backgroundColor: '#808080',
                    textColor: '#fff',
                    visible: true,
                },
            );
            getListStudent(true);
        } catch (error) {
            console.warn("typeError >> ", error)
        }
    }

    return(
        <DeltaContext.Provider value={{
            listStudents,
            student,
            getListStudent,
            deleteStudent
        }}>
            {children}
        </DeltaContext.Provider>
    )
}


export const useDelta = () => {
    const context = useContext(DeltaContext);

    if (!context) {
      throw new Error('useDelta must be used within an homeProps')
    }

    return context;
  }
