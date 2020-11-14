import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
 } from '@chakra-ui/core';

type PaywallBlockProps = {
  isBlocked: boolean;
  paidHandler: any;
};

/** Render a modal dialog to block content behind a paywall. */
export const PaywallBlock = ({
  isBlocked = false,
  paidHandler
}: PaywallBlockProps) => {
  return (
    <Modal isOpen={isBlocked} size='xl' isCentered
      closeOnEsc={false} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent rounded='lg' height='calc(100vh - 20px)'>
        <ModalHeader>Content Blocked</ModalHeader>
        <ModalBody>
          You have reached your limit as a free user.
          Please submit payment in order to view more OnePagers.
        </ModalBody>
        <ModalFooter>
          <Button onClick={paidHandler}>Accept Payment</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}