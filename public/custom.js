// const editorTemplate = `<button id="addProduct" class="button">Add Campaign Title</button>`;

// const productItemsTemplate = _.template(`
// <% _.forEach(products, function(item) { %>
//   <div class="product-item" id="product-item" data-uuid='<%= item.id %>' data-title="<%= item.title %>" data-price="<%= item.price %>" data-image="<%= item.image %>" data-description="<%= item.description
//   %>" >
//   <img src="<%= item.image %>" style="max-height: 300px;width: 100%;" />
//     <h4 style="margin: 0.5rem 0; text-align: left;"><%= item.title %></h4>
//     <p style="text-align: left;  width: 130px;
//     white-space: nowrap;
//     overflow: hidden;
//     text-overflow: ellipsis;"><%= item.description %></p>
//   </div>
// <% }); %>
// `);

// const modalTemplate = function (data) {
//   return `
//   <div class="modal" id="product_library_modal">
//     <div class="modal-dialog modal-dialog-centered">
//       <div class="modal-content">
//         <div class="modal-header">
//           <h3 class="modal-title">Campaign Titles</h3>
//           <button class="close" onclick="hideModal()">&times;</button>
//         </div>
//         <div class="modal-body">
//           <div class="search-box">
//             <input type="text" class="form-control" placeholder="Search by name" id="search-bar" style="width: 78%" />
//             <button id="search-btn" class="button" style="width: 20%">Search</button>
//           </div>
//           <div class="products-list">
//             ${productItemsTemplate(data)}
//           </div>
//         </div>
//         <div class="modal-footer">
//         </div>
//       </div>
//     </div>
//   </div>
// `;
// };

// const toolTemplate = function (values, isViewer = false) {
//   console.log(values);

//   return `<div class="product-card" style="background-color: #BFEDD2;">
//  <div style="margin-top: 10px; object-fit: contain;"> <img style="width: 200px;" src="${
//    values.productImage.url
//  }" /></div>
//   <div class="product-card-body">
//     <h3 class="m-0" style="color: ${values.productTitleColor};">${
//     values.productTitle
//   }</h3>
//     <div class="description">${values.productDescription}</div>
//   </div>
//   <div class="product-footer" style="background-color: #BFEDD2;">
//     <a class="button no-underline no-border-radius" href="${
//       values.productCTAAction.url
//     }" target="${values.productCTAAction.target}" style="background-color: ${
//     values.productCTAColor
//   }; color: ${
//     values.productCTATextColor
//   }; margin-left: 25%; margin-bottom: 10px; margin-top: 10px; width: 50%;">${
//     values.productCTA
//   }</a>
//   </div>
// </div>
// ${isViewer ? modalTemplate({ products: values.data.products }) : ""}
// `;
// };

// const showModal = function () {
//   const modal = document.getElementById("product_library_modal");
//   modal.classList.add("show");
// };

// const hideModal = function () {
//   const modal = document.getElementById("product_library_modal");
//   modal.classList.remove("show");
// };

// unlayer.registerPropertyEditor({
//   name: "product_library",
//   layout: "bottom",
//   Widget: unlayer.createWidget({
//     render(value, updateValue, data) {
//       return editorTemplate;
//     },
//     mount(node, value, updateValue, data) {
//       var addButton = node.querySelector("#addProduct");
//       addButton.onclick = function () {
//         showModal();
//         setTimeout(() => {
//           // We are using event bubling to capture clicked item instead of registering click event on all product items.
//           var selectButton = document.querySelector(".products-list");
//           if (!selectButton) return;
//           selectButton.onclick = function (e) {
//             if (e.target.id === "product-item") {
//               // If user clicks on product item
//               // Find selected item from products list
//               const selectedProduct = data.products.find(
//                 (item) => item.id === parseInt(e.target.dataset.uuid)
//               );
//               updateValue({ selected: selectedProduct });
//             } else {
//               // If user click on child of product item (e.g. title, price, image or desctiption)
//               const parent = e.target.parentElement;
//               if (parent && parent.id !== "product-item") return;
//               const selectedProduct = data.products.find(
//                 (item) => item.id === parseInt(parent.dataset.uuid)
//               );
//               updateValue({ selected: selectedProduct });
//             }
//             hideModal();
//             // This is a hack to close property editor right bar on selecting an item from products list.
//             var outerBody = document.querySelector("#u_body");
//             outerBody.click();
//           };
//           /* Register event listeners for search */
//           var searchBar = document.querySelector("#search-bar");
//           var searchButton = document.querySelector("#search-btn");
//           searchButton.onclick = function (e) {
//             const list = document.querySelector(
//               "#product_library_modal .products-list"
//             );
//             let filteredItem;
//             let productsListHtml;
//             if (list && data && data.products) {
//               if (searchBar.value === "") {
//                 productsListHtml = productItemsTemplate({
//                   products: data.products
//                 });
//               } else {
//                 filteredItem = data.products.filter((item) =>
//                   item.title
//                     .toLowerCase()
//                     .includes(searchBar.value.toLowerCase())
//                 );
//                 productsListHtml = productItemsTemplate({
//                   products: filteredItem
//                 });
//               }
//               list.innerHTML = productsListHtml;
//             }
//           };
//         }, 200);
//       };
//     }
//   })
// });

// unlayer.registerTool({
//   name: "product_tool",
//   label: "Title",
//   icon: "fa-book",
//   supportedDisplayModes: ["web", "email"],
//   options: {
//     productContent: {
//       title: "Product Content",
//       position: 1,
//       options: {
//         productLibrary: {
//           label: "Add Product from store",
//           defaultValue: "",
//           widget: "product_library"
//         },
//         productImage: {
//           label: "Product Image",
//           defaultValue: {
//             url:
//               "https://indie.bookstoreloyalty.com/static/media/no_image_jacket.c4a45ae0.png"
//           },
//           widget: "image"
//         },
//         productTitle: {
//           label: "Title Name",
//           defaultValue: "Title",
//           widget: "text"
//         },
//         productTitleColor: {
//           label: "Product Title Color",
//           defaultValue: "#000000",
//           widget: "color_picker"
//         },
//         productDescription: {
//           label: "Description",
//           defaultValue:
//             "A page turner... An absorbing and emotionally riveting story about what it's like to live during times of crisis. The New York Times Book Review A dazzling new novel of friendship and redemption in the face of tragedy and loss set in 1980s Chicago and contemporary Paris In 1985, Yale Tishman, the development director for an art gallery in Chicago, is about to pull off an amazing coup, bringing in an extraordinary collection of 1920s paintings as a gift to the gallery.",
//           widget: "rich_text"
//         },
//         productPriceColor: {
//           label: "Product Price Color",
//           defaultValue: "#000000",
//           widget: "color_picker"
//         },
//         productPriceBackgroundColor: {
//           label: "Product Price Background",
//           defaultValue: "#ffffff",
//           widget: "color_picker"
//         },
//         productCTA: {
//           label: "Button Name",
//           defaultValue: "Buy",
//           widget: "text"
//         },
//         productCTAColor: {
//           label: "Button Color",
//           defaultValue: "#007bff",
//           widget: "color_picker"
//         },
//         productCTATextColor: {
//           label: "Button Text Color",
//           defaultValue: "#ffffff",
//           widget: "color_picker"
//         },
//         productCTAAction: {
//           label: "Action Type",
//           defaultValue: {
//             name: "web",
//             values: {
//               href: "http://google.com",
//               target: "_blank"
//             }
//           },
//           widget: "link"
//         }
//       }
//     }
//   },
//   transformer: (values, source) => {
//     const { name, value, data } = source;
//     // Transform the values here
//     // We will update selected values in property editor here
//     let newValues =
//       name === "productLibrary"
//         ? {
//             ...values,
//             productTitle: value.selected.title,
//             productDescription: value.selected.description,
//             productImage: {
//               url: value.selected.image
//             }
//           }
//         : {
//             ...values
//           };

//     // Return updated values
//     return newValues;
//   },
//   values: {},

//   renderer: {
//     Viewer: unlayer.createViewer({
//       render(values) {
//         return toolTemplate(values, true);
//       }
//     }),
//     exporters: {
//       web: function (values) {
//         return toolTemplate(values);
//       },
//       email: function (values) {
//         return toolTemplate(values);
//       }
//     },
//     head: {
//       // As we need custom styling in export as well that's why we put those styles here
//       css: function (values) {
//         return `      
//         .product-card {
//           position: relative;
//           display: -webkit-box;
//           display: -ms-flexbox;
//           display: flex;
//           -webkit-box-orient: vertical;
//           -webkit-box-direction: normal;
//           -ms-flex-direction: column;
//           flex-direction: column;
//           min-width: 0;
//           word-wrap: break-word;
//           background-color: #fff;
//           background-clip: border-box;
//           border: 1px solid rgba(0,0,0,.125);
//           border-radius: .25rem;
//           margin: auto;
//           text-align: center;
//         }

//         .product-card-body {
//           padding: 0 1rem 1rem;
//           text-align: left;
//         }

//         .product-card-body h3 {
//           margin: 0.7rem 0;
//         }

//         .product-card img {
//           width: 100%;
//           object-fit: contain;
//           border-top-left-radius: 0.25rem;
//           border-top-right-radius: 0.25rem;
//         }

//         .product-card .product-footer {
//           display: flex;
//           border-bottom-left-radius: 0.25rem;
//           border-bottom-right-radius: 0.25rem;
//           border-top: 1px solid rgba(0,0,0,.125);
//           align-items: center;
//           font-weight: bold;
//         }

//         .product-card .product-footer > div, .product-card .product-footer > .button{
//           width: 50%;
//         }

//         .product-card .product-footer > div {
//           border-bottom-left-radius: 0.25rem;
//         }

//         .product-card .product-footer > .button {
//           border-bottom-right-radius: 0.25rem;
//         }

//         .button {
//           display: inline-block;
//           font-weight: 400;
//           color: #ffffff;
//           text-align: center;
//           vertical-align: middle;
//           background-color: transparent;
//           border: 1px solid transparent;
//           border-radius: 0.25rem;
//           padding: .75rem;
//           font-size: 1rem;
//           line-height: 1.5;
//           transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
//           background-color: rgb(0, 123, 255);
//           cursor: pointer;
//         }

//         .m-0 {
//           margin: 0px;
//         }

//         .no-underline {
//           text-decoration: none;
//         }

//         .no-border-radius {
//           border-radius: 0px;
//         }
//         `;
//       },
//       js: function (values) {}
//     }
//   }
// });

/* eslint-disable no-undef */

unlayer.registerPropertyEditor({
  name: 'variable_selector',
  layout: 'bottom',
  Widget: unlayer.createWidget({
    render(value) {
      return `
        <select class="variable-value">
          <option value="order_number">Order Number</option>
          <option value="recipient_name">Recipient Name</option>
          <option value="tracking_number">Tracking Number</option>
          <option value="delivery_date">Delivery Date</option>
          <option value="status">Status</option>
        </select>
      `
    },
    mount(node, value, updateValue) {
      var input = node.getElementsByClassName('variable-value')[0]
      input.onchange = function (event) {
        updateValue(event.target.value)
      }
    },
  }),
})

unlayer.registerTool({
  type: 'select',
  category: 'contents',
  label: 'Variables',
  icon: 'fa-brackets-curly',
  values: {},
  options: {
    default: {
      title: null,
    },
    alignment: {
      title: 'Alignment',
      position: 1,
      options: {
        textAlignment: {
          label: 'Text Alignment',
          defaultValue: 'center',
          widget: 'alignment',
        },
      },
    },
    text: {
      title: 'Variables',
      position: 2,
      options: {
        variable: {
          label: 'Variable',
          defaultValue: 'order_number',
          widget: 'variable_selector',
        },
      },
    },
  },
  renderer: {
    Viewer: unlayer.createViewer({
      render(values) {
        return `
          <div style="text-align: ${values.textAlignment};">{{ ${values.variable ?? ''} }}</div>
        `
      },
    }),
    exporters: {
      web: function () {},
      email: function () {},
    },
  },
})

// unlayer.registerPropertyEditor({
//   name: 'variable_selector',
//   layout: 'bottom',
//   Widget: unlayer.createWidget({
//     render(value) {
//       return `
//         <select class="variable-value">
//           <option value="order_number">Order Number</option>
//           <option value="recipient_name">Recipient Name</option>
//           <option value="tracking_number">Tracking Number</option>
//           <option value="delivery_date">Delivery Date</option>
//           <option value="status">Status</option>
//         </select>
//       `
//     },
//     mount(node, value, updateValue) {
//       var input = node.getElementsByClassName('variable-value')[0]
//       input.onchange = function (event) {
//         updateValue(event.target.value)
//       }
//     },
//   }),
// })

// unlayer.registerTool({
//   type: 'select',
//   category: 'contents',
//   label: 'Variables',
//   icon: 'fa-brackets-curly',
//   values: {},
//   options: {
//     default: {
//       title: null,
//     },
//     alignment: {
//       title: 'Alignment',
//       position: 1,
//       options: {
//         textAlignment: {
//           label: 'Text Alignment',
//           defaultValue: 'center',
//           widget: 'alignment',
//         },
//       },
//     },
//     text: {
//       title: 'Variables',
//       position: 2,
//       options: {
//         variable: {
//           label: 'Variable',
//           defaultValue: 'order_number',
//           widget: 'variable_selector',
//         },
//       },
//     },
//   },
//   renderer: {
//     Viewer: unlayer.createViewer({
//       render(values) {
//         return `
//           <div style="text-align: ${values.textAlignment};">{{ ${values.variable ?? ''} }}</div>
//         `
//       },
//     }),
//     exporters: {
//       web: function () {},
//       email: function () {},
//     },
//   },
// })
