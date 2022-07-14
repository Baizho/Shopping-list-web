const Totalpricedoc=document.getElementById("TotalPriceOut");
const ParShopCart=document.getElementById("ShopCart");
let TotalPrice=0;
let cart=[];

class Item {
  constructor(name,price){
    this.name=name;
    this.price=price;
  }
}

function refreshStorage(){
  let storageprice=localStorage.getItem("TotalPrice");
  let storagecart=localStorage.getItem("cart");
  if(storageprice!==null) TotalPrice=parseInt(storageprice);
   else TotalPrice=0;
  if(storagecart!==null){
    cart=JSON.parse(storagecart).map((item) => {
      return new Item(item.name,item.price);
    })
  }
   else cart=[];
}
refreshStorage();
refreshUI();
Totalpricedoc.innerText=`Total Price: $${TotalPrice}`;


function refreshUI()
{
  localStorage.setItem("TotalPrice",TotalPrice);
  localStorage.setItem("cart",JSON.stringify(cart));
  Totalpricedoc.innerText=`Total Price: $${TotalPrice}`;
  ParShopCart.innerHTML="";
  cart.forEach((item,index) => {
    
    const listinfo=document.createElement("li");
    const listtext=document.createTextNode(`Name: ${item.name} - Price: $${item.price}`);
    
    listinfo.appendChild(listtext);
    ParShopCart.appendChild(listinfo);
    listinfo.classList.add("Flexrow","justifybetween");
    const listdelete=document.createElement("button");
    const deleteinfo=document.createTextNode("Delete");
    
    listdelete.appendChild(deleteinfo);
    listdelete.classList.add("Dbuttons", "Sizebutton");
    listinfo.appendChild(listdelete);

    listdelete.addEventListener("click", () => {
      cart.splice(index,1);
      TotalPrice-=item.price;
      refreshUI();
    });
  })
  
}

function addItems(form)
{
  const Name=form.ItemName.value;
  const Price=form.ItemPrice.value;
  TotalPrice+=parseInt(Price);
  const item= new Item(Name,parseInt(Price))
  cart.push(item);
  refreshUI();
  form.ItemName.value="";
  form.ItemPrice.value="";
  return false;
}

function DeleteHistory() {
  localStorage.removeItem("cart");
  localStorage.removeItem("TotalPrice");
  refreshStorage();
  refreshUI();
}
