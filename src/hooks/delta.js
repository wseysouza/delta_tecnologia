import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Toast from 'react-native-root-toast';

import { api } from '../services/api';

const DeltaContext = createContext({})

export const DeltaProvider = ({children}) => {
    const [listStudents, setListStudents] = useState([])
    const [studentFilter, setStudentFilter] = useState([]);
    const [studentNotFound, setStudentNotFound] = useState(false);


    const clearSearchStudent = () => {
        setStudentFilter([]);
        setStudentNotFound(false);
    }

    const searchStudent = useCallback((data, callDelete=true) => {
        if(callDelete){
            setStudentNotFound(true)
        }
        const filterList = listStudents.filter(student => {
            if(student.name.toLowerCase().trim() === data.name.toLowerCase().trim()){
                setStudentNotFound(false)
                return student;
            }
        })
        setStudentFilter(filterList)
    },[listStudents])

    const getListStudent = async () => {

        try {
            const { data } = await api.get("/Aluno");
            setListStudents(data.results);
        } catch (error) {
            console.warn("error >> ", error)
            Toast.show(
                `Lista de Alunos não encontrada`,
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
        }
    }

    const postStudent = async(student) => {
        try {
            await api.post("/Aluno",student);
            Toast.show(
                `${student.name}, cadastrado com sucesso!!!`,
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
        } catch (error) {
            console.warn("typeError >> ", error)
            Toast.show(
                `Erro ao cadastrar`,
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
        }

    }

    const putStudent = async (id, student) => {
        try {
            await api.put(`/Aluno/${id}`, student);
            Toast.show(
                `Aluno ${student.name}, editado com sucesso!!!`,
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
        } catch (error) {
            console.warn("typeError >> ", error)
            Toast.show(
                `Erro ao editar`,
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
        }

    }

    const deleteStudent = async (id) => {
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
        } catch (error) {
            console.warn("typeError >> ", error)
            Toast.show(
                `Erro ao deletar`,
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
        }
    }



    return(
        <DeltaContext.Provider value={{
            listStudents,
            studentNotFound,
            studentFilter,
            searchStudent,
            clearSearchStudent,
            getListStudent,
            postStudent,
            putStudent,
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
