const Totalpricedoc = document.getElementById("TotalPriceOut");
const ParShopCart = document.getElementById("ShopCart");
let TotalPrice = 0;
let cart = [];
let thesortoption = "StoL";
let searchitem = "";



class Item {
  constructor(name, price, seconds, minute, hour, day, month, year) {
    this.name = name;
    this.price = price;
    this.seconds = seconds;
    this.minute = minute;
    this.hour = hour;
    this.day = day;
    this.month = month;
    this.year = year;
  }
}

function refreshStorage() {
  let storageprice = localStorage.getItem("TotalPrice");
  let storagecart = localStorage.getItem("shoplistcart");
  if (storageprice !== null) TotalPrice = parseFloat(storageprice);
  else TotalPrice = 0;
  if (storagecart !== null) {
    cart = JSON.parse(storagecart).map((item) => {
      return new Item(item.name, item.price, item.seconds, item.minute, item.hour, item.day, item.month, item.year);
    })
  }
  else cart = [];
}
refreshStorage();
refreshUI();
Totalpricedoc.innerText = `Total Price: $${TotalPrice}`;

function sortLtoS() {
  for (let i = 0; i < cart.length; i++) {
    for (let j = 0; j < cart.length; j++) {
      if (cart[i].price >= cart[j].price) {
        const mem = cart[i];
        cart[i] = cart[j];
        cart[j] = mem;
      }
    }
  }
}
function sortStoL() {
  for (let i = 0; i < cart.length; i++) {
    for (let j = 0; j < cart.length; j++) {
      if (cart[i].price <= cart[j].price) {
        const mem = cart[i];
        cart[i] = cart[j];
        cart[j] = mem;
      }
    }
  }
}
function sortOtoL() {
  for (let i = 0; i < cart.length; i++) {
    for (let j = 0; j < cart.length; j++) {
      if ((cart[i].year < cart[j].year || (cart[i].year === cart[j].year && (cart[i].month < cart[j].month || (cart[i].month === cart[j].month && (cart[i].day < cart[j].day || (cart[i].day === cart[j].day && (cart[i].hour < cart[j].hour || (cart[i].hour === cart[j].hour && (cart[i].minute<cart[j].minute || (cart[i].minute===cart[j].minute && cart[i].seconds<=cart[j].seconds))))))))))) {
        const mem = cart[i];
        cart[i] = cart[j];
        cart[j] = mem;
      }
    }
  }
}
function sortLtoO() {
  for (let i = 0; i < cart.length; i++) {
    for (let j = 0; j < cart.length; j++) {
      if ((cart[i].year > cart[j].year || (cart[i].year === cart[j].year && (cart[i].month > cart[j].month || (cart[i].month === cart[j].month && (cart[i].day > cart[j].day || (cart[i].day === cart[j].day && (cart[i].hour > cart[j].hour || (cart[i].hour === cart[j].hour && (cart[i].minute>cart[j].minute || (cart[i].minute===cart[j].minute && cart[i].seconds>=cart[j].seconds))))))))))) {
        const mem = cart[i];
        cart[i] = cart[j];
        cart[j] = mem;
      }
    }
  }
}


function check(s1, s2) {
  const search = s1.toLowerCase();
  const itemn = s2.toLowerCase();
  if(search.length>itemn.length) {return 0;}
  for (let i = 0; i < search.length; i++) {
    if (search[i] !== itemn[i]) { return 0; }
  }
  return 1;
}

function refreshUI() {
  if (thesortoption === "StoL") { sortStoL(); }
  if (thesortoption === "LtoS") { sortLtoS(); }
  if (thesortoption === "LtoO") { sortLtoO(); }
  if (thesortoption === "OtoL") { sortOtoL(); }
  localStorage.setItem("TotalPrice", TotalPrice);
  localStorage.setItem("shoplistcart", JSON.stringify(cart));
  Totalpricedoc.innerText = `Total Price: $${TotalPrice}`;
  ParShopCart.innerHTML = "";
  let cnt=0;
  cart.forEach((item, index) => {
    if (check(searchitem, item.name) === 1) {
      cnt++;
      const listinfo = document.createElement("li");
      const listtext = document.createTextNode(`Name: ${item.name} - Price: $${item.price}`);

      listinfo.appendChild(listtext);
      ParShopCart.appendChild(listinfo);
      listinfo.classList.add("Flexrow", "justifybetween");
      const listdelete = document.createElement("button");
      const deleteinfo = document.createTextNode("Delete");
      listdelete.appendChild(deleteinfo);
      listdelete.classList.add("Dbuttons", "Sizebutton", "Rad");
      listinfo.appendChild(listdelete);

      listdelete.addEventListener("click", () => {
        cart.splice(index, 1);
        TotalPrice -= item.price;
        refreshUI();
      });
    }
  })
  if(cnt===0) {
    const thetext=document.createTextNode("nothing");
    const area=document.createElement("div");
    area.appendChild(thetext);
    area.style.fontSize="30px";
    ParShopCart.appendChild(area);
  }

}

function Changesearch(inp) {
  searchitem = inp.value;
  const paroptions=document.getElementById("searchoptions");
  paroptions.innerHTML="";
  cart.forEach((item) => {
    if(check(searchitem,item.name)===1 && searchitem.length>0) {
      const newoption=document.createElement("option");
      const thetext=document.createTextNode(`${item.name}`);
      newoption.appendChild(thetext);
      paroptions.appendChild(newoption);
    }
  })
  refreshUI();
}

function addItems(form) {
  const Name = form.ItemName.value;
  const Price = parseFloat(form.ItemPrice.value);
  TotalPrice += (Price);
  let date = new Date(); let day = date.getDate(); let month = date.getMonth() + 1; let year = date.getFullYear(); let hour = date.getHours(); let minute = date.getMinutes(); let seconds=date.getSeconds()
  const item = new Item(Name, Price, seconds, minute, hour, day, month, year);
  cart.push(item);
  refreshUI();
  form.ItemName.value = "";
  form.ItemPrice.value = "";
  return false;
}

function Applysort(form) {
  thesortoption = form.picksort.value;
  refreshUI();
  return false;
}

function DeleteHistory() {
  localStorage.removeItem("shoplistcart");
  localStorage.removeItem("TotalPrice");
  refreshStorage();
  refreshUI();
}
