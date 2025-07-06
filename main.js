request("makanan");
// pilihan.addEventListener("change", function () {
//   console.log(pilihan.value);
//   request(pilihan.value);
// });

// Pindah etalase menggunakan navbar
const contentNav = document.querySelectorAll("nav div");
contentNav.forEach(function (content) {
  content.addEventListener("click", function () {
    contentNav.forEach((c) => {
      c.classList.remove("terpilih");
    });
    content.classList.add("terpilih");
    request(content.dataset.value);
  });
});
async function request(pilihan) {
  // Menggunakan fetch dan di refaktor
  let produk = await getProduk(pilihan);
  console.log(produk);
  updateUI(produk);

  // Ketika tombol selengkapnya di klik
  const tombol = document.querySelectorAll(".tombol");
  console.log(tombol);
  tombol.forEach((t) => {
    t.addEventListener("click", function () {
      let index = this.dataset.index;
      let contentModal = membuatContentModal(produk, index);
      const modal = document.querySelector(".content-modal");
      modal.innerHTML = contentModal;
    });
  });
}
function getProduk(pilihan) {
  return fetch(`data/${pilihan}.json`)
    .then((results) => results.json())
    .then((results) => results.data.products);
}
function updateUI(produk) {
  let kontenCards = ``;
  produk.forEach((produk, index) => {
    kontenCards += membuatCard(produk, index);
  });
  const cards = document.querySelector("#cards");
  cards.innerHTML = kontenCards;
}
function membuatContentModal(data, index) {
  let images = ``;
  data[index].images.forEach((dataImages) => {
    images += `<div class="carousel-item active" data-bs-interval="2500">
                  <img src="${dataImages}" class="d-block w-100" alt="Foto">
                </div>`;
  });
  return `<div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="panggilModalLabel">
                ${data[index].name}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row justify-content-center">
                <div class="col-10 col-sm-5">
                  <div
                    id="carouselExampleInterval"
                    class="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div class="carousel-inner">${images}</div>
                    <button
                      class="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleInterval"
                      data-bs-slide="prev"
                    >
                      <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="visually-hidden">Previous</span>
                    </button>
                    <button
                      class="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleInterval"
                      data-bs-slide="next"
                    >
                      <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
                <div class="col-12 col-sm-7">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <strong>Toko : </strong>${data[index].merchantName}
                    </li>
                    <li class="list-group-item">
                      <strong>Harga : </strong>${data[index].price.priceDisplay}
                    </li>
                    <li class="list-group-item">
                      <strong>Alamat : </strong>${data[index].location}
                    </li>
                    <li class="list-group-item">
                      <strong>Rating : </strong
                      >${data[index].review.sellerRating}
                    </li>
                    <li class="list-group-item">
                      <strong>Brand : </strong>${data[index].brand}
                    </li>
                    <li class="list-group-item">
                      <strong>Deskripsi : </strong>
                      <p>${data[index].uniqueSellingPoint}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>`;
}
function membuatCard(data, index) {
  let hargaDiskon = data.price.priceDisplay.slice(2);
  let hargaAsli = data.price.strikeThroughPriceDisplay
    ? data.price.strikeThroughPriceDisplay
    : "";
  return `<div class="col-6 col-sm-4 col-md-3">
            <div class="card mt-2" style="width:100%;">
              <img
                src="${data.images[0]}"
                class="card-img-top mx-auto d-block"
                alt="gambar product"
                style="aspect-ratio:1/1; width:100%; object-fit:cover;"
              />
              <div class="card-body">
                <h5 class="card-title fs-6 title" >${data.name}</h5>
                <p class="card-text ">
                  <h4 class="text-danger fs-5"><small>Rp</small>${hargaDiskon}
                  <span class="h5 text-decoration-line-through text-secondary fs-6">${hargaAsli}</span></h4>
                </p>
                <p class="card-text">${data.location}</p>
                <a href="#" class="btn btn-primary tombol" data-bs-toggle="modal"
                data-bs-target="#panggilModal" data-index="${index}">Selengkapnya</a>
              </div>
            </div>
          </div>`;
}

// https://www.blibli.com/backend/search/products?searchTerm=hp%20android

// Menggunakan JQuery
// $.ajax({
//   url: `data/${pilihan}.json`,
//   success: (results) => {
//     console.log(results);

//     let cards = ``;
//     let data = results.data.products;
//     for (let index = 0; index < 40; index++) {
//       cards += membuatCard(data[index], index);
//     }
//     $("#cards").html(cards);
//     $(".tombol").on("click", function () {
//       let index = this.dataset.index;
//       let contentModal = membuatContentModal(data, index);
//       $(".ren").html(contentModal);
//     });
//   },
//   error: (e) => {
//     console.log(e);
//   },
// });

// fetch(`data/${pilihan}.json`)
//   .then((results) => results.json())
//   .then((results) => {
//     console.log(results);
//     let kontenCards = ``;
//     let data = results.data.products;
//     for (let index = 0; index < 40; index++) {
//       kontenCards += membuatCard(data[index], index);
//     }
//     const cards = document.querySelector("#cards");
//     cards.innerHTML = kontenCards;
//     // Ketika tombol selengkapnya diklik
//     const tombol = document.querySelectorAll(".tombol");
//     tombol.forEach((t) => {
//       t.addEventListener("click", function () {
//         let index = this.dataset.index;
//         let contentModal = membuatContentModal(data, index);
//         const modal = document.querySelector(".content-modal");
//         modal.innerHTML = contentModal;
//       });
//     });
//   });
