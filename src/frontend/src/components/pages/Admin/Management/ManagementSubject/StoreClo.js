// StoreClo.js

import { useEffect, useState } from "react";
import { Button, message } from 'antd';
import { useParams } from "react-router-dom";
import { axiosAdmin } from "../../../../../service/AxiosAdmin";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Table, Tooltip } from 'antd';
import DropdownAndNavClo from "../../Utils/DropdownAndNav/DropdownAndNavClo";
import BackButton from "../../Utils/BackButton/BackButton";



const StoreClo = (nav) => {
    const { id } = useParams();
    const { setCollapsedNav } = nav;
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedRow, setSelectedRow] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [poListData, setPosListData] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [Subject, setSubject] = useState({});

    const columns = [
        {
            title: "Tên CLO",
            dataIndex: "name",
            render: (record) => (
                <div className="text-sm">
                    <p className="font-medium">{record}</p>
                </div>
            ),
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            render: (record) => (
                <div className="text-sm">
                    <p className="font-medium">{record}</p>
                </div>
            ),
        },
        {
            title: (
                <div className="flex items-center justify-center w-full">
                    <span>Thao tác</span>
                </div>
            ),
            dataIndex: "action",
            render: (_id) => (
                <div className="flex flex-col items-center justify-center w-full gap-2">
                    <Tooltip title="Khôi phục">
                        <Button
                            isIconOnly
                            variant="light"
                            radius="full"
                            onClick={() => handleRestoreById(_id)}
                        >
                            <i className="fa-solid fa-clock-rotate-left"></i>
                        </Button>
                    </Tooltip>
                    <Tooltip title="Xoá vĩnh viễn">
                        <Button
                            isIconOnly
                            variant="light"
                            radius="full"
                            color="danger"
                            onClick={() => { onOpen(); setDeleteId(_id); }}
                        >
                            <i className="fa-solid fa-trash-can"></i>
                        </Button>
                    </Tooltip>
                </div>
            ),
        },

    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRow(selectedRows);
            setSelectedRowKeys(selectedRowKeys);
        },
    };

    const handleUnSelect = () => {
        setSelectedRowKeys([]);
        setSelectedRow([]);
    };
    const handleRestore = async () => {
        const data = {
            clo_id: selectedRowKeys,
        }
        try {
            const response = await axiosAdmin.put('/clos/softDelete', { data });
            handleUnSelect();
            message.success(response.data.message);
            getAllClo()
        } catch (error) {
            console.error("Error soft deleting PLOs:", error);
            message.error('Error soft deleting PLOs');
        }
    };

    const handleRestoreById = async (_id) => {
        try {
            const response = await axiosAdmin.put(`/clo/${_id}/softDelete`);
            handleUnSelect();
            message.success(response.data.message);
            getAllClo()
        } catch (error) {

            console.error(`Error toggling soft delete for PO with ID ${_id}:`, error);
            message.error(`Error toggling soft delete for PO with ID ${_id}`);
        }
    };

    const getAllClo = async () => {
        try {
            const response = await axiosAdmin.get(`/clos?subject_id=${id}&isDelete=true`);
            const updatedPloData = response.data.map((clo) => {
                return {
                    key: clo.clo_id,
                    name: clo.cloName,
                    description: clo.description,
                    isDeleted: clo.isDelete,
                    action: clo.clo_id,
                };
            });
            setPosListData(updatedPloData);

        } catch (error) {
            console.error("Error: " + error.message);
            //message.error('Error fetching PLO data');
        }
    };

    const handleDelete = async () => {
        const data = {
            clo_id: selectedRowKeys,
        };
        console.log(data)
        try {
            const response = await axiosAdmin.delete('/clos/multiple', { params: data });

            await getAllClo();
            handleUnSelect();
            message.success(response.data.message);
        } catch (error) {
            console.error("Error soft deleting Clos:", error);
            message.error('Error soft deleting Clos');
        }
    };

    const handleDeleteById = async (_id) => {
        try {
            const response = await axiosAdmin.delete(`/clo/${_id}`);
            await getAllClo();
            handleUnSelect();
            message.success(response.data.message);
        } catch (error) {
            console.error(`Error toggling soft delete for Clo with ID ${_id}:`, error);
            message.error(`Error toggling soft delete for Clo with ID ${_id}`);
        }
    };
    const getSubjectById = async () => {
        try {
            const response = await axiosAdmin.get(`/subject/${id}`);
            console.log("response.data");
            console.log(response.data);
            setSubject(response?.data?.subject)
        } catch (error) {
            console.error("Error: " + error.message);
        }
    };

    useEffect(() => {
        getAllClo()
        getSubjectById()
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setCollapsedNav(true);
            } else {
                setCollapsedNav(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    return (
        <div className="flex w-full flex-col justify-center leading-8 pt-5 bg-[#f5f5f5]-500">
            <ConfirmAction
                onOpenChange={onOpenChange}
                isOpen={isOpen}
                onConfirm={() => {
                    if (deleteId) {
                        handleDeleteById(deleteId);
                        setDeleteId(null);
                    } else if (selectedRowKeys.length > 0) {
                        handleDelete();
                        setSelectedRowKeys([]);
                    }
                }}
            />
            <div className='w-full flex justify-between'>
                <div className='h-full my-auto p-5 hidden sm:block'>
                    <BackButton />
                </div>

            </div>
           
            <div className="p-5 px-2 sm:p-5 border-2 border-default rounded-xl bg-[#fefefe] shadow-sm"> 
            <div className="p-5 w-full flex justify-center items-start flex-col sm:flex-col lg:flex-row xl:fex-row">
                <div className="text-2xl w-[300px] sm:w-full leading-8 italic font-bold text-[#FF9908] text-wrap flex-1 text-justify">{Subject?.subjectCode + ': ' + Subject?.subjectName}</div>
            </div>
            <div className="pl-5">
                <h1 className="text-xl font-bold text-[#6366F1] text-left">Danh sách CĐR HP đã ẩn</h1>
            </div>
            <div className="w-full my-5 px-5">
                {selectedRowKeys.length !== 0 && (
                    <div className="Quick__Option flex justify-between items-center sticky top-2 bg-[white] z-50 w-full p-4 py-3 border-1 border-slate-300">
                        <p className="text-sm font-medium">
                            <i className="fa-solid fa-circle-check mr-3 text-emerald-500"></i>{" "}
                            Đã chọn {selectedRow.length} clo
                        </p>
                        <div className="flex items-center gap-2">

                            <Tooltip
                                title={`Khôi phục ${selectedRowKeys.length} clo`}
                                getPopupContainer={() =>
                                    document.querySelector(".Quick__Option")
                                }
                            >
                                <Button isIconOnly variant="light" radius="full" onClick={() => handleRestore()}>
                                    <i className="fa-solid fa-clock-rotate-left"></i>
                                </Button>
                            </Tooltip>
                            <Tooltip
                                title={`Xoá vĩnh viễn ${selectedRowKeys.length} clo`}
                                getPopupContainer={() =>
                                    document.querySelector(".Quick__Option")
                                }
                            >
                                <Button isIconOnly variant="light" radius="full" onClick={onOpen}>
                                    <i className="fa-solid fa-trash-can"></i>
                                </Button>
                            </Tooltip>

                            <Tooltip
                                title="Bỏ chọn"
                                getPopupContainer={() =>
                                    document.querySelector(".Quick__Option")
                                }
                            >
                                <Button
                                    isIconOnly
                                    variant="light"
                                    radius="full"
                                    onClick={() => {
                                        handleUnSelect();
                                    }}
                                >
                                    <i className="fa-solid fa-xmark text-[18px]"></i>
                                </Button>
                            </Tooltip>
                        </div>
                    </div>
                )}
                <div className="w-full h-fit overflow-auto">
                    <Table className="table-po min-w-[400px] sm:min-w-[400px] lg:min-w-full xl:min-w-full table-auto text-[#fefefe]"
                        bordered
                        loading={loading}
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={poListData}
                    />
                </div>
            </div>
            </div>
        </div>
    );
}


export default StoreClo;
function ConfirmAction(props) {
    const { isOpen, onOpenChange, onConfirm } = props;
    const handleOnOKClick = (onClose) => {
        onClose();
        if (typeof onConfirm === 'function') {
            onConfirm();
        }
    }
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            motionProps={{
                variants: {
                    enter: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.2,
                            ease: "easeOut",
                        },
                    },
                    exit: {
                        y: -20,
                        opacity: 0,
                        transition: {
                            duration: 0.1,
                            ease: "easeIn",
                        },
                    },
                }
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Cảnh báo</ModalHeader>
                        <ModalBody>
                            <p className="text-[16px]">
                                xóa vĩnh viễn, tiếp tục thao tác?
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="light" onClick={onClose}>
                                Huỷ
                            </Button>
                            <Button color="danger" className="font-medium" onClick={() => handleOnOKClick(onClose)}>
                                Xoá
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
