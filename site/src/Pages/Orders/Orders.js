/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import { FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Context from '../../Context/Context';
import './Orders.css';
import useFetchOrders from '../../Hooks/useFetchOrders';
import currencyFormatter from '../../utils/currencyFormatter';
import dateFormatter from '../../utils/dateFormatter';

function Orders() {
  const { orders, ordersIsFinished } = useContext(Context);
  const navigate = useNavigate();
  const status = {
    created: 'Criada',
    paid: 'Paga',
    canceled: 'Cancelada',
    approved: 'Aprovada',
  };

  // Esta função é responsável por buscar os dados das compras do usuário
  useFetchOrders({ method: 'GET' });

  useEffect(() => {
    if (!orders && ordersIsFinished) {
      navigate('/');
    }
  }, [ordersIsFinished]);

  return (
    <div className="container orders-container">
      <div className="section-title text-center pt-5 pb-4">
        <h1>
          Compras
        </h1>
        <h3>
          Confira as compras realizadas
        </h3>
      </div>
      <div className="accordion pb-4" id="orders">
        {
          orders?.map((order, index) => (
            <div key={ index } className="accordion-item">
              <h3 className="accordion-header" id={ `heading${index}` }>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={ `#collapse${index}` } aria-expanded="true" aria-controls={ `collapse${index}` }>
                  <div className="row py-5 px-2 w-100">
                    <div className="col-1 d-flex align-items-center">
                      <strong>
                        {
                          order.status === 'approved' ? <FiCheckCircle className="icon me-3 text-success" /> : <FiAlertTriangle className="icon me-3 text-primary" />
                        }
                      </strong>
                    </div>
                    <div id="date" className="col-4">
                      <p className="fw-semibold pb-2">
                        Data
                      </p>
                      <p className="text-nowrap">
                        { dateFormatter({ date: order.createdAt }) }
                      </p>
                    </div>
                    <div className="col-3">
                      <p className="fw-semibold pb-2">
                        Identificação
                      </p>
                      <p>
                        { order.paymentId }
                      </p>
                    </div>
                    <div className="col-2">
                      <p className="fw-semibold pb-2">
                        Status
                      </p>
                      <p>
                        { status[order.status] || 'Não identificado' }
                      </p>
                    </div>
                    <div className="col-2 pe-4">
                      <p className="fw-semibold pb-2">
                        Total
                      </p>
                      <p>
                        { currencyFormatter({ value: order.payedAmount, symbol: true, format: 'pt-BR' }) }
                      </p>
                    </div>
                  </div>
                </button>
              </h3>
              <div id={ `collapse${index}` } className="accordion-collapse collapse" aria-labelledby={ `heading${index}` } data-bs-parent="#orders">
                <div className="accordion-body">
                  {
                    order.items.map((item, idx) => (
                      <div key={ idx } className={ `row m-0 py-5 px-2 w-100 ${idx % 2 !== 0 ? 'orders-product-row' : 'orders-product-row-even'}` }>
                        <div className="col-1">
                          <p className="fw-semibold pb-2 text-center">
                            Qtd.
                          </p>
                          <p className="text-center">
                            { item.quantity }
                          </p>
                        </div>
                        <div className="col-7">
                          <p className="fw-semibold pb-2">
                            Produto
                          </p>
                          <p>
                            { item.title }
                          </p>
                        </div>
                        <div id="price" className="col-2">
                          <p className="fw-semibold pb-2 text-end">
                            Preço
                          </p>
                          <p className="text-end">
                            { currencyFormatter({ format: 'pt-BR', value: item.unitPrice, symbol: true }) }
                          </p>
                        </div>
                        <div className="col-2">
                          <p className="fw-semibold pb-2 text-end">
                            Subtotal
                          </p>
                          <p className="text-end">
                            { currencyFormatter({ format: 'pt-BR', value: item.unitPrice * item.quantity, symbol: true }) }
                          </p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Orders;
