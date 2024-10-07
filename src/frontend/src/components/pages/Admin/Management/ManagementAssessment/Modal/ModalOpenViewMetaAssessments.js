import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem, Button, Textarea, } from "@nextui-org/react";
import { message } from 'antd';
import { axiosAdmin } from '../../../../../../service/AxiosAdmin';
import { UseNavigate, UseTeacherAuth, UseTeacherId } from '../../../../../../hooks';
import { fetchAssessmentsByidTeacher } from '../Data/DataAssessmentGrading';
import { Table } from '@nextui-org/react';
import { handleReplaceCharacters } from '../../../Utils/Utils';

function ModalOpenViewMetaAssessments({ isOpen, onOpenChange, metaAssessment }) {

  return (
    <Modal
    size="5xl"
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    scrollBehavior="outside"
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
      },
    }}
  >
    <ModalContent>
      {(onClose) => (
        <>
     <ModalHeader className="text-[#FF9908] flex flex-col">
  <span className="text-lg font-semibold">Xem điểm cuối</span>
  <span className="text-lg text-gray-600 mt-1">
    Lớp: {metaAssessment[0]?.course?.courseName || 'N/A'}
  </span>
</ModalHeader>

          <ModalBody>
          <div className="flex flex-col items-center w-full">
  <div className="overflow-x-auto w-full min-w-[300px]">
    <div className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="p-4 font-semibold text-gray-700 text-left">Sinh viên</th>
            <th className="p-4 font-semibold text-gray-700 text-left">Điểm từ giáo viên</th>
            <th className="p-4 font-semibold text-gray-700 text-left">Điểm cuối</th>
          </tr>
        </thead>
        <tbody>
          {metaAssessment.map((assessment) => (
            <tr key={assessment.meta_assessment_id} className="divide-y divide-gray-200">
              <td className="p-4 text-gray-600">
                {assessment?.Student?.name || 'N/A'}
              </td>
              <td className="p-4 text-gray-600">
                {assessment?.Assessment?.length > 0 ? (
                  assessment.Assessment.map((assess, index) => (
                    <div key={index}>
                      GV {index + 1}: {assess.teacher?.name || 'N/A'} - {assess.totalScore}
                    </div>
                  ))
                ) : (
                  'N/A'
                )}
              </td>
              <td className="p-4 text-gray-600">
                {assessment?.FinalScore || 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

          </ModalBody>
          <ModalFooter>
            <Button
              variant="light"
              onClick={() => {
                onClose();
              }}
            >
              Đóng
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
  );
};

export default ModalOpenViewMetaAssessments;