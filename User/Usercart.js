let Cart = JSON.parse(localStorage.getItem("product"))||[];
console.log(Cart);
    let Container = document.getElementById("cart-container");
    function DisplayProduct(data) {
      Container.innerHTML = "";
      Cart.forEach((product) => {
        let card = document.createElement("div");
        let image = document.createElement("img");

        let title = document.createElement("p");
        let div = document.createElement("div");
        let quantity = document.createElement("span");
        let price = document.createElement("h4");
        let Remove = document.createElement("button");
        let Increment = document.createElement("button");
        let Decrement = document.createElement("button");
        quantity.textContent=product.quantity
        Remove.textContent = "Remove";
        Increment.textContent="+"
        Decrement.textContent="-"
        image.src = product.image;
        price.textContent = `₹${product.price}`;
        title.textContent = product.title;
        Remove.addEventListener("click", () => {
            Cart=Cart.filter((ele)=>{
              return ele.id!==product.id
            })
            localStorage.setItem("cart",JSON.stringify(Cart))
            DisplayProduct()
        });
        Increment.addEventListener("click", () => {
          product=product.quantity++
          localStorage.setItem("cart",JSON.stringify(Cart))
          DisplayProduct()
        });
        Decrement.addEventListener("click", () => {
          if(product.quantity>1){
            product=product.quantity--
          localStorage.setItem("cart",JSON.stringify(Cart))
          DisplayProduct()
          }
        });
        div.append(Decrement,quantity,Increment)
        card.append(image, title, price, div,Remove);
        Container.append(card);
      });
      let total=document.getElementById("cart-total")
console.log(total.innerText)
      let sum=0
      for(let i=0;i<Cart.length;i++){
        // console.log(Cart[i].price)
        sum+=Cart[i].price*Cart[i].quantity
      }
      console.log(sum);
    total.innerText=sum;

    }
    DisplayProduct();
    document.getElementById("buy").addEventListener("click",()=>{
      if (window.confirm("please conform your details")) {
        // window.open("sign.html", "Go for signin!");
       location.href="./Userchekout.html";
      }

    })