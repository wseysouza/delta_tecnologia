import React, { createContext, useCallback, useContext, useState, useEffect } from 'react';
import { toast } from '../components/Toast';

import { api } from '../services/api';

export interface StudentProps {
    objectId: string,
    name: string,
    adress: string,
    photo?: string,
}

export interface PutPostStudentProps {
    name: string,
    adress?: string,
    photo?: string | null,
}

export interface DataStudentProps {
    data?: {}
    name: string,
}

export interface DeltaContextData {
    listStudents: StudentProps[];
    studentFilter: StudentProps[];
    studentNotFound: boolean;
    clearSearchStudent: () => void;
    searchStudent: (data: DataStudentProps, callDelete?: boolean) => void;
    getListStudent(): Promise<void>;
    postStudent: (student: PutPostStudentProps) => void;
    putStudent: (id: string, student: PutPostStudentProps, nameSearch: string) => void;
    deleteStudent: (id: string, nameStudent: string) => void;
}


const DeltaContext = createContext<DeltaContextData>({} as DeltaContextData)

export const DeltaProvider: React.FC = ({ children }) => {
    const [studentFilter, setStudentFilter] = useState<StudentProps[]>([]);
    const [studentNotFound, setStudentNotFound] = useState(false);
    const [listStudents, setListStudents] = useState<StudentProps[]>([])
    const [nameStudent, setNameStudent] = useState("")

    const clearSearchStudent = () => {
        setStudentFilter([]);
        setStudentNotFound(false);
        setNameStudent("")
    }

    const searchStudent = useCallback((data: DataStudentProps, callDelete = true) => {
        if (callDelete) {
            setStudentNotFound(true)
        }
        if (data.name !== "" && data.name !== undefined) {
            const filterList = listStudents.filter((student) => {
                if (student.name.toLowerCase().trim().match(data.name.toLowerCase().trim())) {
                    setStudentNotFound(false)
                    return student
                }
            })
            setStudentFilter(filterList)
        }
    }, [listStudents])

    useEffect(() => {
        if (nameStudent !== "" && nameStudent !== undefined) {
            const filterList = listStudents.filter((student) => {
                if (student.name.toLowerCase().trim().match(nameStudent.toLowerCase().trim())) {
                    setStudentNotFound(false)
                    return student
                }
            })
            setStudentFilter(filterList)
        }
    }, [listStudents])

    const getListStudent = async () => {
        try {
            const { data } = await api.get("/Aluno");
            setListStudents(data.results);
        } catch (error) {
            console.warn("error >> ", error)
            toast.warn({ menssage: "Lista de alunos não encontrada" });
        }
    }

    const postStudent = async (student: PutPostStudentProps) => {
        try {
            await api.post("/Aluno", student);
            toast.success({ menssage: "Aluno cadastrado com sucesso!!!" });
        } catch (error) {
            console.warn("typeError >> ", error)
            toast.warn({ menssage: "Erro ao cadastrar" });
        }
    }

    const putStudent = async (id: string, student: PutPostStudentProps, nameSearch: string) => {
        setNameStudent(nameSearch)
        try {
            await api.put(`/Aluno/${id}`, student);
            toast.success({ menssage: "Aluno alterado com sucesso!!!" });
        } catch (error) {
            console.warn("typeError >> ", error)
            toast.warn({ menssage: "Erro ao editar" });
        }
    }

    const deleteStudent = async (id: string, nameStudent: string) => {
        setNameStudent(nameStudent)
        try {
            await api.delete(`/Aluno/${id}`);
            toast.success({ menssage: "Aluno deletado com sucesso" });
        } catch (error) {
            console.warn("typeError >> ", error)
            toast.warn({ menssage: "Erro ao deletar" });
        }
    }

    return (
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
