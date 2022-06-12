const create = (order) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .wrapper {
            margin: 1em;
            padding: 1em;
            border: 1px solid black;
            border-radius: 10px;
            font-family: sans-serif;
        }

        .wrapper div {
            margin-bottom: 1em;
        }

        .wrapper div:last-of-type {
            margin-bottom: 0;
        }

        .header {
            background-color: #00b106;
            padding: 1em;
            border-radius: 10px;
        }

        .header img {
            margin-bottom: .5em;
        }

        p {
            font-size: .9rem;
            line-height: 1.1rem;
        }

        .header p {
            font-weight: 600;
            color: white;
            font-size: 1rem;
        }

        h1 {
            margin-top: 1em;
            font-weight: bold;
            color: #00b106;
            font-size: 1.1rem;
            margin-bottom: .5em;
        }

        div h1:first-of-type {
            margin-top: 0;
        }

        .info {
            background-color: #f3f3f3;
            padding: 1em;
            border-radius: 10px;
            border: 1px solid #333333;
        }

        .title {
            font-size: .8rem;
            font-weight: bold;
            margin-bottom: .25em;
        }

        .value {
            margin-bottom: 1em;
        }

        .value:last-of-type {
            margin-bottom: 0;
        }

        .val {
            font-weight: bold;
        }

        .sum p {
            line-height: 1.5rem;
        }

        a {
            text-decoration: none;
            color: black;
            display: inline-block;
        }

        .order {
            background-color: #00b106;
            color: white;
            padding: .75em 1em;
            border-radius: 5px;
        }

    </style>
    <title>Rabbit Mart Emails</title>
</head>
<body>

<div class="wrapper">
    <div class="header">
        <img src="https://www.rabbitmart.com/wp-content/uploads/elementor/thumbs/Asset-10-pbt0jiavo8y3y0m7qnt9e3yd60kthgffsxacekimmw.png"
             alt="Rabbit Mart"/>
        <p>Order Confirmation</p>
    </div>
    <div class="body">
        <h1>Hello,</h1>
        <p>Thanks for your order. You can view the status of your order and track shipping by visiting our website.</p>
        <h1>Customer Information</h1>
        <div class="info">
            <p class="title">Customer Name</p>
            <p class="value">${order.name.first} ${order.name.last}</p>
            <p class="title">Phone Number</p>
            <p class="value">${order.phone_number}</p>
            <p class="title">Address</p>
            <p class="value">${order.address}</p>
        </div>
        <h1>Order Summary</h1>
        <div class="sum">
            <p>Order Tracking Id: <span class="val">#HELLO1</span></p>
            <p>Items Purchased: <span class="val">${order.products.length} Items</span></p>
            <p>Expected Arrival: <span class="val">${order.ordered_at}</span></p>
            <p>Grand Total: <span class="val">${order.total} EGP</span></p>
        </div>
        <div class="buttons">
            <a class="order" href="http://localhost:3000/orders/${order.order_id}">View Order</a>
            <a href="http://localhost:3000/shipping/${order.order_id}">Track Shipping</a>
        </div>
    </div>
</div>

</body>
</html>
`

export default create;