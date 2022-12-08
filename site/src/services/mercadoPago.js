/* eslint-disable no-unused-vars */
const mercadopago = new MercadoPago(mercadoPagoPublicKey);
let cardPaymentBrickController;

const authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiZDQ1NzM1YjEtMjdhOS00OWQ5LTlmZDMtNDc2Y2VjODhiZDllIiwibmFtZSI6Ikd1c3Rhdm8gTGVuZGltdXRoIiwiZW1haWwiOiJndXN0YXZvbGVuZGltdXRoQGdtYWlsLmNvbSJ9LCJpYXQiOjE2Njk4MzY0OTN9.h5ITQ8NM5JSX4JAPHjjwt1fDkQI4MPVwo9lrT8IlLYg';

const items = [
  {
    productId: 'a8cf986e-10fe-43cc-99ed-8480b1ec449c',
    title: 'Product title',
    description: 'Product description',
    quantity: 1,
    unitPrice: 100,
  },
];

const loadPaymentForm = async () => {
  const productCost = document.getElementById('amount').value;
  const settings = {
    initialization: {
      amount: productCost,
    },
    callbacks: {
      onReady: () => {
        console.log('brick ready');
      },
      onError: (error) => {
        alert(JSON.stringify(error));
      },
      onSubmit: async ({ selectedPaymentMethod, formData, paymentType }) => new Promise(processPayment(formData))
        .then((response) => { resolve(); })
        .catch((error) => { reject(); }),
    },
    locale: 'pt-BR',
    customization: {
      paymentMethods: {
        creditCard: 'all',
        bankTransfer: ['pix'],
      },
      visual: {
        defaultPaymentOption: {
          creditCardForm: true,
        },
        style: {
          theme: 'dark',
          customVariables: {
            formBackgroundColor: '#1d2431',
            baseColor: 'aquamarine',
          },
        },
      },
    },
  };

  const bricks = mercadopago.bricks();
  cardPaymentBrickController = await bricks.create('payment', 'mercadopago-bricks-container__PaymentCard', settings);
};

const processPayment = (formData) => {
  fetch('http://localhost:3000/process_payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization,
    },
    body: JSON.stringify({ formData, items }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (!result.hasOwnProperty('error_message')) {
        document.getElementById('payment-id').innerText = result.id;
        document.getElementById('payment-status').innerText = result.status;
        document.getElementById('payment-detail').innerText = result.detail;
        $('.container__payment').fadeOut(500);
        setTimeout(() => { $('.container__result').show(500).fadeIn(); }, 500);
      } else {
        alert(JSON.stringify({
          status: result.status,
          message: result.error_message,
        }));
      }
    })
    .catch((error) => {
      alert(`Unexpected error\n${JSON.stringify(error)}`);
    });
};

// Handle transitions
document.getElementById('checkout-btn').addEventListener('click', () => {
  $('.container__cart').fadeOut(500);
  setTimeout(() => {
    loadPaymentForm();
    $('.container__payment').show(500).fadeIn();
  }, 500);
});

document.getElementById('go-back').addEventListener('click', () => {
  $('.container__payment').fadeOut(500);
  setTimeout(() => { $('.container__cart').show(500).fadeIn(); }, 500);
});

// Handle price update
function updatePrice() {
  const quantity = document.getElementById('quantity').value;
  const unitPrice = document.getElementById('unit-price').innerText;
  const amount = parseInt(unitPrice) * parseInt(quantity);

  document.getElementById('cart-total').innerText = `$ ${amount}`;
  document.getElementById('summary-price').innerText = `$ ${unitPrice}`;
  document.getElementById('summary-quantity').innerText = quantity;
  document.getElementById('summary-total').innerText = `$ ${amount}`;
  document.getElementById('amount').value = amount;
}

document.getElementById('quantity').addEventListener('change', updatePrice);
updatePrice();
