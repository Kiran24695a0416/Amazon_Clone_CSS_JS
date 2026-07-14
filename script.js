
const AppSession = {
    getCart() {
        try {
            return JSON.parse(localStorage.getItem("amazon_clone_cart")) || [];
        } catch {
            return [];
        }
    },
    saveCart(cartArray) {
        localStorage.setItem("amazon_clone_cart", JSON.stringify(cartArray));
    },
    addToCart(item) {
        const cart = this.getCart();
        cart.push(item);
        this.saveCart(cart);
        alert(`🛒 Added "${item.title}" to your shopping cart ledger!`);
    }
};


document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Core Storefront Framework Active.");
    const pageTitle = document.title.toLowerCase();

    if (pageTitle.includes("sign in") || pageTitle.includes("client sign in")) {
        initSignInModule();
    } else if (pageTitle.includes("registry") || pageTitle.includes("create account")) {
        initRegistrationModule();
    } else if (pageTitle.includes("checkout container") || pageTitle.includes("cart")) {
        initCartModule();
    } else if (pageTitle.includes("welcome home")) {
        initAlternatingCarouselModule();
    } else {
        initProductCatalogModule();
    }
});



function initSignInModule() {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    loginForm.addEventListener("submit", (e) => {
        const usernameInput = document.getElementById("loginUser").value.trim();
        const passwordInput = document.getElementById("loginPass").value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!usernameInput || !passwordInput) {
            e.preventDefault();
            alert("⚠️ Please operationalize all mandatory entry vector grids.");
        } else if (!emailRegex.test(usernameInput) && usernameInput.length < 10) {
            e.preventDefault();
            alert("⚠️ Entry value structural identity mismatch. Check email configurations.");
        } else if (passwordInput.length < 6) {
            e.preventDefault();
            alert("⚠️ Integrity parameters demand a key minimum of 6 string indices.");
        } else {
            e.preventDefault();
            alert("🔒 Access profile parameters verified. Synchronizing framework data pipeline...");
            window.location.href = "home.html";
        }
    });
}

function initRegistrationModule() {
    const registerForm = document.getElementById("registerForm");
    if (!registerForm) return;

    registerForm.addEventListener("submit", (e) => {
        const name = document.getElementById("regName").value.trim();
        const pass = document.getElementById("regPass").value.trim();

        if (name.length < 2) {
            e.preventDefault();
            alert("⚠️ Identity tracing names require distinct valid inputs.");
        } else if (pass.length < 6) {
            e.preventDefault();
            alert("⚠️ Target passcode matrices require 6 characters minimum.");
        } else {
            e.preventDefault();
            alert("✅ Secure storage space generated. Redirecting client back to verification...");
            window.location.href = "index.html";
        }
    });
}


function initProductCatalogModule() {
    const container = document.querySelector(".container");
    const table = document.querySelector(".container table");
    if (!table || !container) return;

  
    const dashboardDeck = document.createElement("div");
    dashboardDeck.style.cssText = `
        margin-bottom: 20px; background: #fff; padding: 12px 20px;
        border: 1px solid #ddd; border-radius: 4px; display: flex;
        flex-wrap: wrap; gap: 20px; align-items: center;
    `;
    dashboardDeck.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:13px; font-weight:bold;">Arrange:</span>
            <select id="catalogSort" style="padding:4px 8px; font-size:13px; border-radius:3px; border:1px solid #a6a6a6;">
                <option value="featured">Featured Layout</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
            </select>
        </div>
        <div style="display:flex; align-items:center; gap:10px; flex-grow:1;">
            <span style="font-size:13px; font-weight:bold; white-space:nowrap;">Max Rate: <span id="maxLabel">$2000</span></span>
            <input type="range" id="priceCeiling" min="10" max="2000" value="2000" step="10" style="width:100%; max-width:250px; accent-color:#e77600;">
        </div>
    `;
    container.insertBefore(dashboardDeck, table);

    const productCells = Array.from(table.querySelectorAll("td"));
    const recordsMap = [];

    productCells.forEach((cell) => {
        const title = cell.querySelector("h3")?.textContent || "Model Node";
        const rawPrice = cell.querySelector(".price")?.textContent || "$0";
        const parsedPrice = parseFloat(rawPrice.replace(/[^0-9.]/g, "")) || 0;

        const cartBtn = document.createElement("button");
        cartBtn.className = "add-to-cart-btn";
        cartBtn.innerText = "Add to Cart";
        cartBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            AppSession.addToCart({ title: title, price: parsedPrice });
        });
        cell.appendChild(cartBtn);

        recordsMap.push({ domNode: cell, title: title, price: parsedPrice });
    });

    const selectorSort = document.getElementById("catalogSort");
    const structuralSlider = document.getElementById("priceCeiling");
    const structuralLabel = document.getElementById("maxLabel");

    function runEvaluationFilterPipeline() {
        const currentLimit = parseFloat(structuralSlider.value);
        structuralLabel.textContent = `$${currentLimit}`;

        recordsMap.forEach((item) => {
            if (item.price <= currentLimit) {
                item.domNode.style.opacity = "1";
                item.domNode.style.pointerEvents = "auto";
            } else {
                item.domNode.style.opacity = "0.15";
                item.domNode.style.pointerEvents = "none";
            }
        });

        const sortingType = selectorSort.value;
        if (sortingType === "featured") return;

        const evaluatedSortedMap = [...recordsMap].sort((alpha, beta) => {
            return sortingType === "price-low" ? alpha.price - beta.price : beta.price - alpha.price;
        });

        const parentBody = table.querySelector("tbody") || table;
        const layoutRows = Array.from(parentBody.querySelectorAll("tr"));
        let nodeTracker = 0;

        layoutRows.forEach((row) => {
            const rowCapacities = Array.from(row.querySelectorAll("td"));
            rowCapacities.forEach(() => {
                if (nodeTracker < evaluatedSortedMap.length) {
                    row.appendChild(evaluatedSortedMap[nodeTracker].domNode);
                    nodeTracker++;
                }
            });
        });
    }

    structuralSlider.addEventListener("input", runEvaluationFilterPipeline);
    selectorSort.addEventListener("change", runEvaluationFilterPipeline);
}



function initCartModule() {
    const emptyNoticeCard = document.getElementById("cartStatusPanel");
    const cartContentWrapper = document.getElementById("cartContentWrapper");
    const cartTableBody = document.getElementById("cartTableBody");
    const cartSumDisplay = document.getElementById("cartSumDisplay");

    if (!cartTableBody) return;
    const currentItems = AppSession.getCart();

    if (currentItems.length === 0) {
        emptyNoticeCard.style.display = "block";
        cartContentWrapper.style.display = "none";
    } else {
        emptyNoticeCard.style.display = "none";
        cartContentWrapper.style.display = "block";
        cartTableBody.innerHTML = "";

        let financialAggregate = 0;
        currentItems.forEach((product) => {
            financialAggregate += product.price;
            const structuralRow = document.createElement("tr");
            structuralRow.innerHTML = `
                <td style="font-weight:600; color:#0F1111;">${product.title}</td>
                <td style="color:#B12704; font-weight:700; text-align:right;">$${product.price.toFixed(2)}</td>
            `;
            cartTableBody.appendChild(structuralRow);
        });
        cartSumDisplay.textContent = `$${financialAggregate.toFixed(2)}`;
    }
}



let indexPrimary = 1;
let indexSecondary = 1;

function initAlternatingCarouselModule() {
    if (document.getElementById("carouselPrimary")) {
        renderPrimaryDeck(indexPrimary);
        setInterval(() => { shiftPrimary(1); }, 5000);
    }
    if (document.getElementById("carouselSecondary")) {
        renderSecondaryDeck(indexSecondary);
        setInterval(() => { shiftSecondary(1); }, 6500);
    }
}

function shiftPrimary(step) { renderPrimaryDeck(indexPrimary += step); }
function shiftSecondary(step) { renderSecondaryDeck(indexSecondary += step); }

function renderPrimaryDeck(target) {
    const frames = document.getElementsByClassName("primary-slide");
    if (!frames.length) return;
    if (target > frames.length) { indexPrimary = 1; }
    if (target < 1) { indexPrimary = frames.length; }
    for (let i = 0; i < frames.length; i++) { frames[i].style.display = "none"; }
    frames[indexPrimary - 1].style.display = "block";
}

function renderSecondaryDeck(target) {
    const frames = document.getElementsByClassName("secondary-slide");
    if (!frames.length) return;
    if (target > frames.length) { indexSecondary = 1; }
    if (target < 1) { indexSecondary = frames.length; }
    for (let i = 0; i < frames.length; i++) { frames[i].style.display = "none"; }
    frames[indexSecondary - 1].style.display = "block";
}







let currentSlideIndex = 1;
let automatedSlideTimer = null;

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".slideshow-container")) {
        renderSlideshowFrame(currentSlideIndex);
        startAutomaticShowCycle();
    }
});



function moveSlides(offsetStep) {
    resetAutomaticShowCycle();
    renderSlideshowFrame(currentSlideIndex += offsetStep);
}



function setCurrentSlide(targetIndex) {
    resetAutomaticShowCycle();
    renderSlideshowFrame(currentSlideIndex = targetIndex);
}



function renderSlideshowFrame(targetIndex) {
    const slidesList = document.getElementsByClassName("mySlides");
    const dotsList = document.getElementsByClassName("slide-dot");
    
    if (!slidesList.length) return;

    if (targetIndex > slidesList.length) { currentSlideIndex = 1; }
    if (targetIndex < 1) { currentSlideIndex = slidesList.length; }


    for (let i = 0; i < slidesList.length; i++) {
        slidesList[i].style.display = "none";
    }
    for (let i = 0; i < dotsList.length; i++) {
        dotsList[i].className = dotsList[i].className.replace(" active", "");
    }

   
    slidesList[currentSlideIndex - 1].style.display = "block";
    if (dotsList.length >= currentSlideIndex) {
        dotsList[currentSlideIndex - 1].className += " active";
    }
}


function startAutomaticShowCycle() {
    automatedSlideTimer = setInterval(() => {
        currentSlideIndex++;
        renderSlideshowFrame(currentSlideIndex);
    }, 4500);
}

function resetAutomaticShowCycle() {
    if (automatedSlideTimer) {
        clearInterval(automatedSlideTimer);
        startAutomaticShowCycle();
    }
}