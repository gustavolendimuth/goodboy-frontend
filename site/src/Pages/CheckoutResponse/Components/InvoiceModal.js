/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// Libraries
import { Button, Modal, Form, Container, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import $ from 'jquery';
import 'jquery-mask-plugin';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// Utils
import fetchOrders from '../../../utils/fetchOrders';
// Styles
import './InvoiceModal.css';

const schema = z.object({
  name: z.string().min(3, 'no mínimo 3 caracteres'),
  address: z.string().min(5, 'o endereço deve ter no mínimo 5 caracteres'),
  number: z.string().min(1, 'maior do que 0'),
  complement: z.string().optional(),
  neighborhood: z.string().min(3, 'no mínimo 3 caracteres'),
  postalCode: z.string().min(9, '8 números'),
  paymentId: z.string(),
});

export default function InvoiceModal({ paymentId, status }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === 'approved') {
      setShowModal(true);
    }
  }, [status]);

  useEffect(() => {
    $('#cep').mask('00000-000');
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      paymentId,
    },
  });

  const sendFormData = async (data) => {
    const response = await fetchOrders({ endpoint: 'tiny_order', method: 'POST', body: data });
    console.log(response);
  };

  const closeModal = () => setShowModal(false);

  return (
    <Modal show={ showModal } onHide={ closeModal } className="invoice-modal">
      <Container>
        <Modal.Header className="border-bottom-0 pt-5 px-lg-5 pb-4 d-flex align-items-start" closeButton>
          <Modal.Title className="fw-bold mb-0 fs-lg-2 fs-4">
            Deseja emitir Nota Fiscal?
            <p className="text-primary m-0">somente para a cidade de São Paulo</p>
          </Modal.Title>
        </Modal.Header>
        <Form autoComplete="on" onSubmit={ handleSubmit((formData) => sendFormData(formData)) }>
          <Modal.Body className="pt-0 px-lg-5 pb-lg-4 d-flex flex-column gap-3">
            <Form.Control { ...register('paymentId') } type="text" hidden />
            <Form.Group className="form-floating" controlId="nome">
              <Form.Control { ...register('name') } type="text" className="rounded-3" placeholder="Nome na nota" />
              <Form.Label>Nome na nota</Form.Label>
              { errors.name && <Form.Text className="text-danger">{ errors.name.message }</Form.Text> }
            </Form.Group>
            <Form.Group className="form-floating" controlId="endereco">
              <Form.Control { ...register('address') } type="text" className="rounded-3" placeholder="Endereço" />
              <Form.Label>Endereço</Form.Label>
              { errors.address && <Form.Text className="text-danger">{ errors.address.message }</Form.Text> }
            </Form.Group>
            <Row className="g-3">
              <Col xs={ 5 }>
                <Form.Group className="form-floating" controlId="numero">
                  <Form.Control type="number" { ...register('number') } className="rounded-3" placeholder="Número" />
                  <Form.Label>Número</Form.Label>
                  { errors.number && <Form.Text className="text-danger">{ errors.number.message }</Form.Text> }
                </Form.Group>
              </Col>
              <Col xs={ 7 }>
                <Form.Group className="form-floating" controlId="complemento">
                  <Form.Control type="text" { ...register('complement') } className="rounded-3" placeholder="Complemento" />
                  <Form.Label>Complemento</Form.Label>
                  { errors.complement && <Form.Text className="text-danger">{ errors.complement.message }</Form.Text> }
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3">
              <Col xs={ 7 }>
                <Form.Group className="form-floating" controlId="bairro">
                  <Form.Control type="text" { ...register('neighborhood') } className="rounded-3" placeholder="Bairro" />
                  <Form.Label>Bairro</Form.Label>
                  { errors.neighborhood && <Form.Text className="text-danger">{ errors.neighborhood.message }</Form.Text> }
                </Form.Group>
              </Col>
              <Col xs={ 5 }>
                <Form.Group className="form-floating" controlId="cep">
                  <Form.Control type="text" { ...register('postalCode') } className="rounded-3" placeholder="Cep" />
                  <Form.Label>Cep</Form.Label>
                  { errors.postalCode && <Form.Text className="text-danger">{ errors.postalCode.message }</Form.Text> }
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-top-0 px-lg-5 pb-lg-5 pb-4 pt-0">
            <Button variant="primary w-100 btn-lg mx-0" type="submit">
              Emitir
            </Button>
            <Button variant="secondary w-100 btn-lg mx-0" onClick={ closeModal }>
              Cancelar
            </Button>
          </Modal.Footer>
        </Form>
      </Container>
    </Modal>
  );
}

InvoiceModal.propTypes = {
  paymentId: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
