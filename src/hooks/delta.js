import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from '../components/Toast';

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
        const filterList =  listStudents.filter(student => {
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
            toast.warn({ menssage: "Lista de alunos não encontrada" });
        }
    }

    const postStudent = async (student) => {
        try {
            await api.post("/Aluno",student);
            toast.success({ menssage: "Aluno cadastrado com sucesso!!!" });
        } catch (error) {
            console.warn("typeError >> ", error)
            toast.warn({ menssage: "Erro ao cadastrar" });
        }
    }

    const putStudent = async (id, student) => {
        try {
            await api.put(`/Aluno/${id}`, student);
            toast.success({ menssage: "Aluno alterado com sucesso!!!" });
        } catch (error) {
            console.warn("typeError >> ", error)
            toast.warn({ menssage: "Erro ao editar" });
        }
    }

    const deleteStudent = async (id) => {
        try {
            await api.delete(`/Aluno/${id}`);
            toast.success({ menssage: "Aluno deletado com sucesso" });
        } catch (error) {
            console.warn("typeError >> ", error)
            toast.warn({ menssage: "Erro ao deletar" });
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
