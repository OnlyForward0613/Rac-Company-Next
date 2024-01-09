import { useState } from "react"

const ShopHistoryData = [
    {
        RequestID: "R78667",
        TrackingID: "SH78667"
    }, {
        InvoiceID: "IN6123578",
        CreatedData: "2023-01-23",
        CreatedTime: "19:49:01"
    }, {
        BuyerUserName: "RAC45361",
        BuyerName: "Mr Rex Offor",
        BuyerPhone: "+234 8080006321",
        BuyerEmail: "rexoffor@gmail.com",
        BuyerCity: "2e festac junction beside soprite",
        BuyerCountry: "ikeja, Lagos State, Nigeria, 095444"
    }, {
        ShippingUserName: "Mr Rex Offor",
        ShippingName: "RAC",
        ShippingPhone: "+234 8080006321",
        ShippingEmail: "rexoffor@gmail.com",
        ShippingCity: "2e festac junction beside soprite",
        ShippingCountry: "ikeja, Lagos State, Nigeria, 095444"
    }, {
        SellerName: "RAC LOGISTICS LTD.",
        SellererPhone: "+234 8080006321",
        SellerEmail: "rexoffor@gmail.com",
        SellerCity: "29b Osolo Way Opposite Polaris Bank Ajao Estate",
        SellerCountry: "ikeja, Lagos State, Nigeria, 075348"
    }, {
        ImportantNotice0: "You are covered for your full declared value of $65.00 only in case of total l" +
                "oss or damage"
    }, {
        ShippingCost: "$126.66",
        HandlingCost: "$126.66"
    }, {
        ImportantNotice2: "We do not ship or return any fraudulent purchased items. You are advised to on" +
                "ly pay to ship items that you can provide valid evidence of proof of purchase " +
                "when and if requested. Items for which valid proof of purchase can be provided" +
                " will be handed over to the CUSTOMS. In addition any shipping cost paid will b" +
                "e forfeited and billed to you as cost of verification."
    }, {
        TotalNumber: "6",
        TotalWeight: "30lbs",
        TotalCost: "$345.00",
        ProcessingFee: "$345.00",
        PurchaseFee: "$0.00",
        TotalMeCost: "$0.00"
    }, {
        TransactionID:"TX1234567",
        TransactionData:"20/12/2021  19:31"
    }

]

const ItemData = [
    {
        ItemSrc: "product",
        Item: "SteelSeries Rival 5 Gaming Laptop with PrismSync RGB...",
        ItemUrl: "htttp/jjnkkukjajjnkkukjajjnkkukja",
        ItemCost: "$88.99",
        ItemQuantity: "3",
        TotalValue: "$112.49"
    }, {
        ItemSrc: "product",
        Item: "SteelSeries Rival 5 Gaming Laptop with PrismSync RGB...",
        ItemUrl: "htttp/jjnkkukjajjnkkukjajjnkkukja",
        ItemCost: "$88.99",
        ItemQuantity: "3",
        TotalValue: "$112.49"
    }
]

const OrderItem1 = [
    [
        "Total Urgent Purchase Cost:", 126.66
    ],
    [
        "Total Cost of Items from Store:", 126.66
    ],
    [
        "Total Shipping to Origin Warehouse cost:", 126.66
    ],
    [
        "Total Processing Fee:", 126.66
    ],
    [
        "VAT:", 126.66
    ],
    [
        "Payment Method Surcharge:", 126.66
    ],
    [
        "Discount:", 126.66
    ]
]

const OrderItem2 = [
    [
        "Shipping Cost:", 126.66
    ],
    [
        "Clearing, Port Handling:", 126.66
    ],
    [
        "Other Charges:", 126.66
    ],
    [
        "Storage Charge:", 126.66
    ],
    [
        "Insurance:", 126.66
    ],
    [
        "VAT:", 126.66
    ],
    [
        "Payment Method Surcharge:", 126.66
    ],
    [
        "Discount:", 126.66
    ]
]

const OrderItem3 = [
    [
        "Shipping Cost:", 126.66
    ],
    [
        "Pickup Cost:", 126.66
    ],
    [
        "Clearing, Port Handling:", 126.66
    ],
    [
        "Other Charges:", 126.66
    ],
    [
        "Storage Charge:", 126.66
    ],
    [
        "Insurance:", 126.66
    ],
    [
        "VAT:", 126.66
    ],
    [
        "Payment Method Surcharge:", 126.66
    ],
    [
        "Discount:", 126.66
    ]
]

const OrderItem4 = [
    [
        "Customs Clearing:", 126.66
    ],
    [
        "VAT:", 126.66
    ],
    [
        "Payment Method Surcharge:", 126.66
    ],
    [
        "Discount:", 126.66
    ]
]



const ShopHistory = () => {

    return (
        <div className="font-robot">
            <div
                className="flex max-w-[1000px] flex-col gap-[20px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
                <div
                    className="flex max-sm:flex-col items-center rounded-[20px] border-2 border-dashed border-[#6750A4] p-[20px] ">
                    <div className="text-[28px] text-[#6750A4]">
                        Invoice - Shop For Me Service     
                    </div>
                    <div className="flex items-center text-[28px] text-[#21005D]">
                        <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mx-[10px]">
                            <circle cx="5" cy="5" r="5" fill="#21005D"/>
                        </svg>
                        Shop For Me Service
                    </div>
                </div>

                <div
                    className="flex max-sm:flex-col items-center justify-center rounded-[20px] border-2 border-solid border-[#CAC4D0] p-[10px] ">
                    <div className="flex">
                        <div className="text-[28px] max-sm:text-[22px] text-[#1C1B1F]">Request ID:</div>
                        <div className="text-[28px] max-sm:text-[22px] font-[700] text-[#1C1B1F]">{
                                ShopHistoryData[0]
                                    ?.RequestID
                            }</div>
                    </div>

                    {/* <div className="flex items-center">
                        <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15 27.5C21.9 27.5 27.5 21.9 27.5 15C27.5 8.1 21.9 2.5 15 2.5C8.1 2.5 2.5 8.1 2.5 15C2.5 21.9 8.1 27.5 15 27.5ZM10.625 14.0625L17.1125 14.0625L14.9625 11.9125C14.6 11.55 14.6 10.95 14.9625 10.5875C15.15 10.4 15.3875 10.3125 15.625 10.3125C15.8625 10.3125 16.1 10.4 16.2875 10.5875L20.0375 14.3375C20.4 14.7 20.4 15.3 20.0375 15.6625L16.2875 19.4125C15.925 19.775 15.325 19.775 14.9625 19.4125C14.6 19.05 14.6 18.45 14.9625 18.0875L17.1125 15.9375L10.625 15.9375C10.1125 15.9375 9.6875 15.5125 9.6875 15C9.6875 14.4875 10.1125 14.0625 10.625 14.0625Z"
                                fill="#79747E"/>
                        </svg>
                        <div className="text-[28px] max-sm:text-[22px] text-[#1C1B1F]">Tracking ID:</div>
                        <div className="text-[28px] max-sm:text-[22px] font-[700] text-[#1C1B1F]">{
                                ShopHistoryData[0]
                                    ?.TrackingID
                            }</div>
                    </div> */}

                    <div className="flex max-sm:mt-[20px] items-center">
                        <div
                            className="flex items-center pe-[10px] ps-[30px] max-sm:ps-0 text-[22px] text-[#1C1B1F]">
                            Unpaid
                        </div>
                        <button
                            className="btn relative flex h-[40px] w-[122px] items-center justify-center gap-x-2 rounded-[6.25rem] bg-[#B3261E] px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:ps-1">
                            <img src="/images/icon.svg"></img>
                            <div className="text-white text-[14px] font-[500]">
                                Pay Now
                            </div>
                        </button> 
                        
                    </div>
                        {/* <div className="flex ms-[30px] max-sm:mt-[20px] items-center">
                            <svg
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="mx-[10px]">
                                <circle cx="5" cy="5" r="5" fill="#21005D"/>
                            </svg>
                            <div
                                className="flex items-center pe-[10px] max-sm:ps-0 text-[22px] text-[#1C1B1F]">
                                Paid
                            </div>
                        </div> */}
                </div>

                <div className="flex justify-between max-sm:flex-col max-sm:items-center">
                    <svg
                        width="80"
                        height="123"
                        viewBox="0 0 80 123"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M75.0077 23.0029H24.956C18.8553 23.0029 13.0044 20.5794 8.69052 16.2655C4.37664 11.9516 1.95313 6.10075 1.95312 0L40.0489 0C47.4852 0.0032922 54.758 2.18316 60.9701 6.27075C67.1822 10.3583 72.0621 16.1748 75.0077 23.0029V23.0029Z"
                            fill="#061043"/>
                        <path
                            d="M78.0552 36.2026V49.5494H41.8281V26.5508H76.7869C77.5221 29.7192 77.9469 32.9518 78.0552 36.2026V36.2026Z"
                            fill="#061043"/>
                        <path
                            d="M53.3317 53.2695H53.3275C46.9766 53.2695 41.8281 58.418 41.8281 64.7689V64.7731C41.8281 71.124 46.9766 76.2724 53.3275 76.2724H53.3317C59.6826 76.2724 64.831 71.124 64.831 64.7731V64.7689C64.831 58.418 59.6826 53.2695 53.3317 53.2695Z"
                            fill="#DF5000"/>
                        <path
                            d="M38.4808 26.5508V76.0655C28.6668 75.669 19.3872 71.4895 12.5865 64.4027C5.78585 57.316 1.99201 47.8721 2.00001 38.0501V26.5508H38.4808Z"
                            fill="#061043"/>
                        <path
                            d="M25.5169 107.947H18.3575L17.9236 105.194C17.7789 104.281 17.5676 103.575 17.2894 103.074C17.0113 102.562 16.6052 102.206 16.0711 102.006C15.5482 101.795 14.8362 101.689 13.935 101.689L6.92578 101.656V96.816L14.7861 96.7826C15.9432 96.7715 16.7721 96.5545 17.2727 96.1317C17.7734 95.7089 18.0237 95.1082 18.0237 94.3293V94.1792C18.0237 93.4003 17.7734 92.8051 17.2727 92.3935C16.7721 91.9707 15.9432 91.7593 14.7861 91.7593H6.92578V86.6192H15.5037C18.7302 86.6192 21.0833 87.131 22.563 88.1546C24.0539 89.1781 24.7993 90.6912 24.7993 92.6939V92.8441C24.7993 94.3905 24.332 95.5643 23.3975 96.3654C22.474 97.1664 21.1055 97.6114 19.292 97.7005V98.7518L18.491 97.834C19.9373 97.9452 21.0666 98.2234 21.8788 98.6684C22.7021 99.1134 23.3251 99.7643 23.7479 100.621C24.1707 101.478 24.51 102.585 24.7659 103.942L25.5169 107.947ZM8.84497 107.947H2.23628V86.6192H8.82828V98.8186L8.84497 101.105V107.947ZM33.6114 107.947H26.6022L35.6307 86.6192H45.427L54.3387 107.947H47.3295L40.7708 90.7747H40.2869L33.6114 107.947ZM46.9957 103.375H33.9285V98.2679H46.9957V103.375ZM67.8247 108.698C63.4967 108.698 60.248 107.702 58.0785 105.711C55.909 103.708 54.8242 100.921 54.8242 97.35V97.083C54.8242 93.5895 55.8923 90.8526 58.0284 88.8722C60.1757 86.8807 63.391 85.8849 67.6745 85.8849C68.7759 85.8849 69.805 85.9572 70.7619 86.1019C71.7187 86.2354 72.6032 86.4301 73.4153 86.686C74.2387 86.9307 74.9952 87.2256 75.685 87.5705L76.2524 93.0944C75.1955 92.6494 74.0551 92.2655 72.8312 91.9429C71.6185 91.6202 70.2445 91.4589 68.7092 91.4589C66.395 91.4589 64.6928 91.9596 63.6024 92.9609C62.5121 93.9622 61.9669 95.3251 61.9669 97.0496V97.3166C61.9669 99.0634 62.5177 100.449 63.6191 101.472C64.7317 102.485 66.5508 102.991 69.0763 102.991C70.5226 102.991 71.8466 102.829 73.0482 102.507C74.2609 102.184 75.3957 101.811 76.4527 101.389L75.8853 107.029C75.2177 107.352 74.4723 107.641 73.649 107.897C72.8368 108.153 71.9412 108.348 70.9621 108.481C69.9942 108.626 68.9484 108.698 67.8247 108.698ZM3.60474 111.416V119.947H0.89451V111.416H3.60474ZM2.26965 119.947V117.798H8.59798V119.947H2.26965ZM14.4709 120.248C12.7531 120.248 11.4492 119.854 10.5591 119.066C9.67349 118.274 9.23069 117.161 9.23069 115.728V115.635C9.23069 114.202 9.67349 113.092 10.5591 112.304C11.4492 111.512 12.7531 111.116 14.4709 111.116C16.1887 111.116 17.4904 111.512 18.3761 112.304C19.2661 113.092 19.7111 114.202 19.7111 115.635V115.728C19.7111 117.161 19.2661 118.274 18.3761 119.066C17.4904 119.854 16.1887 120.248 14.4709 120.248ZM14.4709 118.058C15.2631 118.058 15.8639 117.853 16.2733 117.444C16.6872 117.03 16.8941 116.46 16.8941 115.735V115.628C16.8941 114.903 16.6872 114.335 16.2733 113.926C15.8639 113.512 15.2631 113.305 14.4709 113.305C13.6743 113.305 13.0713 113.512 12.6619 113.926C12.2524 114.335 12.0477 114.903 12.0477 115.628V115.735C12.0477 116.46 12.2524 117.03 12.6619 117.444C13.0713 117.853 13.6743 118.058 14.4709 118.058ZM25.2342 120.248C24.3397 120.248 23.5609 120.072 22.8978 119.72C22.2347 119.369 21.7207 118.859 21.3558 118.192C20.9909 117.524 20.8084 116.716 20.8084 115.768V115.662C20.8084 114.238 21.2713 113.125 22.1969 112.324C23.1226 111.523 24.4955 111.122 26.3157 111.122C26.8408 111.122 27.3326 111.151 27.7909 111.209C28.2493 111.263 28.6743 111.34 29.0659 111.443C29.4576 111.541 29.8158 111.659 30.1407 111.797L30.3877 113.946C29.8626 113.777 29.3085 113.63 28.7255 113.505C28.1425 113.381 27.475 113.319 26.7229 113.319C25.6503 113.319 24.8649 113.517 24.3664 113.913C23.8725 114.304 23.6255 114.876 23.6255 115.628V115.735C23.6255 116.438 23.8324 116.999 24.2463 117.417C24.6646 117.836 25.3121 118.045 26.1888 118.045C26.5582 118.045 26.8764 118.011 27.1434 117.945C27.4149 117.878 27.6463 117.789 27.8377 117.678C28.029 117.562 28.187 117.44 28.3116 117.31V116.202L28.6053 116.763L26.062 116.79V114.894H30.6881V118.405H28.2849C28.1959 118.779 28.0424 119.104 27.8243 119.38C27.6063 119.656 27.2903 119.869 26.8764 120.021C26.4625 120.172 25.9151 120.248 25.2342 120.248ZM28.2983 119.947L28.3784 117.878H30.6881V119.947H28.2983ZM35.1306 111.416V119.947H32.4204V111.416H35.1306ZM40.8103 120.188C40.2807 120.188 39.7756 120.154 39.2949 120.087C38.8143 120.021 38.3693 119.936 37.9598 119.834C37.5549 119.731 37.1944 119.627 36.8784 119.52L36.5914 117.11C37.121 117.324 37.7551 117.524 38.4939 117.711C39.2371 117.893 40.0025 117.985 40.7902 117.985C41.4667 117.985 41.9295 117.942 42.1787 117.858C42.4324 117.769 42.5592 117.613 42.5592 117.391V117.364C42.5592 117.208 42.4969 117.088 42.3723 117.003C42.2522 116.919 42.0385 116.85 41.7315 116.796C41.4288 116.743 41.0061 116.687 40.4631 116.63C39.5775 116.527 38.8388 116.383 38.2469 116.196C37.6594 116.009 37.2189 115.733 36.9251 115.368C36.6359 115.003 36.4912 114.505 36.4912 113.873V113.826C36.4912 112.936 36.8406 112.273 37.5393 111.837C38.2424 111.396 39.2816 111.176 40.6567 111.176C41.5201 111.176 42.2633 111.24 42.8863 111.369C43.5138 111.494 44.0634 111.647 44.5352 111.83L44.8355 114.033C44.2704 113.806 43.654 113.628 42.9865 113.499C42.3189 113.37 41.6336 113.305 40.9304 113.305C40.4587 113.305 40.1004 113.327 39.8557 113.372C39.6153 113.416 39.4529 113.479 39.3684 113.559C39.2883 113.639 39.2482 113.737 39.2482 113.853V113.859C39.2482 113.988 39.2972 114.095 39.3951 114.18C39.493 114.264 39.6888 114.338 39.9825 114.4C40.2807 114.462 40.7212 114.525 41.3042 114.587C42.172 114.676 42.9063 114.805 43.5071 114.974C44.1079 115.143 44.5619 115.404 44.8689 115.755C45.1804 116.107 45.3362 116.603 45.3362 117.244V117.317C45.3362 118.31 44.9668 119.037 44.2281 119.5C43.4938 119.958 42.3545 120.188 40.8103 120.188ZM51.7809 119.947H49.0707V112.364H51.7809V119.947ZM55.0653 113.532H45.7864V111.416H55.0653V113.532ZM59.0944 111.416V119.947H56.3842V111.416H59.0944ZM65.7353 120.248C64.0042 120.248 62.7047 119.849 61.8369 119.053C60.9691 118.252 60.5352 117.137 60.5352 115.708V115.602C60.5352 114.204 60.9624 113.109 61.8169 112.317C62.6758 111.521 63.9619 111.122 65.6753 111.122C66.1158 111.122 66.5275 111.151 66.9102 111.209C67.2929 111.263 67.6467 111.34 67.9716 111.443C68.3009 111.541 68.6036 111.659 68.8795 111.797L69.1064 114.006C68.6837 113.828 68.2275 113.675 67.738 113.546C67.2529 113.416 66.7033 113.352 66.0891 113.352C65.1635 113.352 64.4826 113.552 64.0465 113.953C63.6103 114.353 63.3923 114.898 63.3923 115.588V115.695C63.3923 116.394 63.6125 116.948 64.0531 117.357C64.4982 117.762 65.2258 117.965 66.236 117.965C66.8145 117.965 67.3441 117.9 67.8248 117.771C68.3098 117.642 68.7638 117.493 69.1865 117.324L68.9596 119.58C68.6926 119.709 68.3944 119.825 68.0651 119.927C67.7402 120.03 67.382 120.107 66.9903 120.161C66.6031 120.219 66.1848 120.248 65.7353 120.248ZM74.5265 120.188C73.9969 120.188 73.4918 120.154 73.0112 120.087C72.5305 120.021 72.0855 119.936 71.6761 119.834C71.2711 119.731 70.9106 119.627 70.5946 119.52L70.3076 117.11C70.8372 117.324 71.4714 117.524 72.2101 117.711C72.9533 117.893 73.7188 117.985 74.5065 117.985C75.1829 117.985 75.6457 117.942 75.895 117.858C76.1486 117.769 76.2755 117.613 76.2755 117.391V117.364C76.2755 117.208 76.2131 117.088 76.0885 117.003C75.9684 116.919 75.7548 116.85 75.4477 116.796C75.1451 116.743 74.7223 116.687 74.1794 116.63C73.2938 116.527 72.555 116.383 71.9631 116.196C71.3757 116.009 70.9351 115.733 70.6414 115.368C70.3521 115.003 70.2075 114.505 70.2075 113.873V113.826C70.2075 112.936 70.5568 112.273 71.2555 111.837C71.9587 111.396 72.9978 111.176 74.373 111.176C75.2363 111.176 75.9795 111.24 76.6026 111.369C77.23 111.494 77.7797 111.647 78.2514 111.83L78.5518 114.033C77.9866 113.806 77.3702 113.628 76.7027 113.499C76.0351 113.37 75.3498 113.305 74.6466 113.305C74.1749 113.305 73.8167 113.327 73.5719 113.372C73.3316 113.416 73.1691 113.479 73.0846 113.559C73.0045 113.639 72.9644 113.737 72.9644 113.853V113.859C72.9644 113.988 73.0134 114.095 73.1113 114.18C73.2092 114.264 73.405 114.338 73.6987 114.4C73.9969 114.462 74.4375 114.525 75.0205 114.587C75.8883 114.676 76.6226 114.805 77.2234 114.974C77.8242 115.143 78.2781 115.404 78.5852 115.755C78.8967 116.107 79.0524 116.603 79.0524 117.244V117.317C79.0524 118.31 78.6831 119.037 77.9443 119.5C77.21 119.958 76.0707 120.188 74.5265 120.188Z"
                            fill="#061043"/>
                    </svg>

                    <div className="flex flex-col justify-center">
                        <div className="flex">
                            <div className="mt-8 flex flex-col">
                                <div className="text-[16px] font-[500]">Invoice ID</div>
                                <div className="text-[22px]">{
                                        ShopHistoryData[1]
                                            ?.InvoiceID
                                    }</div>
                            </div>
                            <svg
                                className="mx-[10px]"
                                width="20"
                                height="90"
                                viewBox="0 0 20 90"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <line x1="11" y1="10" x2="11" y2="80" stroke="black" stroke-width="2"/>
                            </svg>
                            <div className="flex flex-col">
                                <div className="text-[16px] font-[500]">Created at</div>
                                <div className="text-[22px]">{
                                        ShopHistoryData[1]
                                            ?.CreatedData
                                    }</div>
                                <div className="text-[22px]">{
                                        ShopHistoryData[1]
                                            ?.CreatedTime
                                    }</div>
                            </div>
                        </div>
                        <div className="text-center text-[16px]">
                            This invoice hasn't been paid yet
                        </div>
                    </div>
                </div>

                <div className="flex justify-between max-sm:flex-col mt-[10px]">
                    <div
                        className="flex h-[173px] w-[267.5px] max-sm:h-[161px] max-sm:w-full flex-col justify-end">
                        <div className="text-[22px]">Invoiced To</div>
                        <div className="flex flex-row text-[16px]">
                            <div className="font-[500]">{
                                    ShopHistoryData[2]
                                        ?.BuyerUserName
                                }
                                -</div>
                            <div className="font-[700]">{
                                    ShopHistoryData[2]
                                        ?.BuyerName
                                }</div>
                        </div>
                        <div className="text-[16px]">{
                                ShopHistoryData[2]
                                    ?.BuyerPhone
                            }</div>
                        <div className="text-16px]">{
                                ShopHistoryData[2]
                                    ?.BuyerEmail
                            }</div>
                        <div className="text-[16px]">
                            {
                                ShopHistoryData[2]
                                    ?.BuyerCity
                            },
                            <br></br>
                            {
                                ShopHistoryData[2]
                                    ?.BuyerCountry
                            }
                        </div>
                    </div>

                    {/* <div
                        className="flex h-[173px] w-[267.5px] max-sm:h-[161px] max-sm:w-full flex-col justify-end">
                        <div className="text-[22px]">Shipping To</div>
                        <div className="flex flex-row text-[16px]">
                            <div className="font-[500]">{
                                    ShopHistoryData[3]
                                        ?.ShippingUserName
                                }
                                /</div>
                            <div className="font-[700]">{
                                    ShopHistoryData[3]
                                        ?.ShippingName
                                }</div>
                        </div>
                        <div className="text-[16px]">{
                                ShopHistoryData[3]
                                    ?.ShippingPhone
                            }</div>
                        <div className="text-16px]">{
                                ShopHistoryData[3]
                                    ?.ShippingEmail
                            }</div>
                        <div className="text-[16px]">
                            {
                                ShopHistoryData[3]
                                    ?.ShippingCity
                            },
                            <br></br>
                            {
                                ShopHistoryData[3]
                                    ?.ShippingCountry
                            }
                        </div>
                    </div> */}

                    <div
                        className="flex h-[173px] w-[267.5px] max-sm:w-full flex-col max-sm:items-end max-sm:my-[20px]">
                        {/* // w-[345px] */}
                        <div className="text-[22px]">Pay To</div>
                        <div className="flex flex-row font-[500] text-[16px]">
                                    {ShopHistoryData[4]
                                        ?.SellerName}
                        </div>
                        <div className="text-[16px]">{
                                ShopHistoryData[4]
                                    ?.SellererPhone
                            }</div>
                        <div className="text-16px]">{
                                ShopHistoryData[4]
                                    ?.SellerEmail
                            }</div>
                        <div className="flex text-[16px] max-sm:text-right">
                            {
                                ShopHistoryData[4]
                                    ?.SellerCity
                            },
                            <br></br>{
                                ShopHistoryData[4]
                                    ?.SellerCountry
                            }
                        </div>
                    </div>

                    <div
                        className="h-[173px] w-[345px] max-sm:w-full rounded-[20px] border bg-[#CAC4D0] px-[14px] py-[10px]">
                        {/* className="w-full rounded-[20px] border bg-[#CAC4D0] px-[14px] py-[10px]" */}
                        <div className="mb-[20px] ps-[14px] text-[22px] text-[#21005D]">
                            IMPORTANT NOTICE:
                        </div>
                        <div className="text-[16px] ps-[14px] text-[#49454F]">
                            {
                                ShopHistoryData[5]
                                    ?.ImportantNotice0
                            }
                            {/* <li>You can track shipment online with <b>Tracking ID:{ShopHistoryData[0]?.TrackingID}</b></li>
                            <li>You are covered for your full declared value of $65.00 only in case of total loss or damage</li> */
                            }
                        </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM14.79 12.53L11.26 16.06C11.11 16.21 10.92 16.28 10.73 16.28C10.54 16.28 10.35 16.21 10.2 16.06C9.91 15.77 9.91 15.29 10.2 15L13.2 12L10.2 9C9.91 8.71 9.91 8.23 10.2 7.94C10.49 7.65 10.97 7.65 11.26 7.94L14.79 11.47C15.09 11.76 15.09 12.24 14.79 12.53Z"
                                    fill="#1D192B"/>
                            </svg>
                            <div className="tex-[14px] ps-[10px] font-[500]">
                                Shipping methods
                            </div>
                        </div>
                        <div className="mb-[10px] mt-[15px] px-[20px] py-[10px] text-[22px]">
                            Select Shipping Method
                        </div>

                        <div
                            className="w-[940px] max-sm:w-full rounded-[20px] border border-solid border-[#CAC4D0]">
                            <div
                                className="mb-[10px] mt-[6px] ms-[20px] max-sm:ms-[10px] flex items-center">
                                <div className="flex h-[40px] w-[40px] items-center justify-center">
                                    <input type="radio" className="opacity-0.38 h-4 w-4"></input>
                                </div>
                                <p className="text-[14px] font-[500]">Basic</p>
                            </div>
                            <div
                                className="mb-[10px] flex ps-[50px] max-sm:ps-[25px] text-[14px] font-[500]">
                                <div className="w-[160px] ">Shipping Cost:</div>
                                <div>$126.66</div>
                            </div>
                            <div
                                className="mb-[10px] flex ps-[50px] max-sm:ps-[25px] text-[14px] font-[500]">
                                <div className="w-[160px]">Clearing, Port Handling:</div>
                                <div>$126.66</div>
                            </div>
                            <div className="mb-[10px] flex ps-[50px] max-sm:ps-[25px] text-[14px]">
                                This shipping method takes your package 5 working days to arrive your
                                destination from the 1st Wednesday after your payment, You can call us on +234
                                700 700 6000 or +1 888 567 8765 or send us a dm to get alternative shipping
                                methods with different benefits.
                            </div>
                            <div className="mb-[14px] flex ps-[50px] max-sm:ps-[25px] text-[14px]">
                                The cost paid here covers clearing, documentation and delivery to the
                                destination.
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM14.79 12.53L11.26 16.06C11.11 16.21 10.92 16.28 10.73 16.28C10.54 16.28 10.35 16.21 10.2 16.06C9.91 15.77 9.91 15.29 10.2 15L13.2 12L10.2 9C9.91 8.71 9.91 8.23 10.2 7.94C10.49 7.65 10.97 7.65 11.26 7.94L14.79 11.47C15.09 11.76 15.09 12.24 14.79 12.53Z"
                                    fill="#1D192B"/>
                            </svg>
                            <div className="tex-[14px] ps-[10px] font-[500]">
                                Payment methods
                            </div>
                        </div>
                        <div className="mb-[10px] mt-[15px] px-[20px] py-[10px] text-[22px]">
                            Select the Payment Method You Wish to Use
                        </div>

                        <div
                            className="w-[940px] max-sm:w-full rounded-[20px] border border-solid border-[#CAC4D0]">
                            <div className="flex items-center ml-[10px] mr-[20px] justify-between">
                                <div className="mb-[10px] mt-[6px] flex items-center">
                                    <div className="flex h-[40px] w-[40px] items-center justify-center">
                                        <input type="radio" className="opacity-0.38 h-4 w-4"></input>
                                    </div>
                                    <p className="text-[14px] font-[500]">
                                        Paystack - Pay with Naira Card
                                    </p>
                                </div>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
                                        fill="#292D32"/>
                                    <path
                                        d="M15.5262 14.0099C15.3362 14.0099 15.1463 13.9399 14.9963 13.7899L11.9963 10.7899L8.99625 13.7899C8.70625 14.0799 8.22625 14.0799 7.93625 13.7899C7.64625 13.4999 7.64625 13.0199 7.93625 12.7299L11.4663 9.19992C11.7563 8.90992 12.2362 8.90992 12.5262 9.19992L16.0562 12.7299C16.3462 13.0199 16.3462 13.4999 16.0562 13.7899C15.9062 13.9399 15.7162 14.0099 15.5262 14.0099Z"
                                        fill="#292D32"/>
                                </svg>
                            </div>

                            <div className="mb-[14px] flex ps-[40px] max-sm:ps-[25px] text-[14px]">
                                Pay with any payment method that Paystack offers such Card, Bank Transfers,
                                USSD, etc.
                            </div>
                        </div>
                    </div>
                    {/* <div className='flex gap-[20px] justify-between max-sm:flex-col font-[500]'>
                        <div className='w-full'>
                            <div className="flex">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM14.79 12.53L11.26 16.06C11.11 16.21 10.92 16.28 10.73 16.28C10.54 16.28 10.35 16.21 10.2 16.06C9.91 15.77 9.91 15.29 10.2 15L13.2 12L10.2 9C9.91 8.71 9.91 8.23 10.2 7.94C10.49 7.65 10.97 7.65 11.26 7.94L14.79 11.47C15.09 11.76 15.09 12.24 14.79 12.53Z"
                                        fill="#1D192B"/>
                                </svg>
                                <div className="tex-[14px] ps-[10px]">
                                    Shipping methods
                                </div>
                            </div>

                            <div
                                className="flex w-full rounded-[20px] border border-solid border-[#CAC4D0] px-[5px] py-[12px] my-[10px]">
                                <div
                                    className="mb-[10px] mt-[6px] ms-[20px] max-sm:ms-[10px] flex items-center">
                                    <p className="text-[16px]">Basic</p>
                                </div>
                            </div>
                        </div>

                        <div className='w-full'>
                            <div className="flex">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM14.79 12.53L11.26 16.06C11.11 16.21 10.92 16.28 10.73 16.28C10.54 16.28 10.35 16.21 10.2 16.06C9.91 15.77 9.91 15.29 10.2 15L13.2 12L10.2 9C9.91 8.71 9.91 8.23 10.2 7.94C10.49 7.65 10.97 7.65 11.26 7.94L14.79 11.47C15.09 11.76 15.09 12.24 14.79 12.53Z"
                                        fill="#1D192B"/>
                                </svg>
                                <div className="tex-[14px] ps-[10px] font-[500]">
                                    Payment methods
                                </div>
                            </div>

                            <div
                                className="flex w-full rounded-[20px] border border-solid border-[#CAC4D0] px-[5px] py-[12px] my-[10px]">
                                <div
                                    className="mb-[10px] mt-[6px] ms-[20px] max-sm:ms-[10px] flex items-center">
                                    <p className="text-[16px]">Paid</p>
                                    <p className="text-[14px] ms-[10px]">- via Paystack</p>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div
                        className="flex justify-between gap-[20px] w-full flex-1 max-sm:flex-col-reverse">
                        <div className="flex flex-col">
                            <div className="flex pb-[10px]">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM14.79 12.53L11.26 16.06C11.11 16.21 10.92 16.28 10.73 16.28C10.54 16.28 10.35 16.21 10.2 16.06C9.91 15.77 9.91 15.29 10.2 15L13.2 12L10.2 9C9.91 8.71 9.91 8.23 10.2 7.94C10.49 7.65 10.97 7.65 11.26 7.94L14.79 11.47C15.09 11.76 15.09 12.24 14.79 12.53Z"
                                        fill="#1D192B"/>
                                </svg>
                                <div className="tex-[14px] ps-[10px] font-[500]">Take Note</div>
                            </div>

                            <div
                                className="flex-1 w-full mt-[5px] max-sm:w-full max-sm:h-auto rounded-[20px] border bg-[#F2B8B5] px-[14px] py-[10px]">
                                <div className="mb-[20px] ps-[14px] text-[22px] text-[#21005D]">
                                    IMPORTANT NOTICE:
                                </div>
                                <div className="text-[14px] px-[14px] text-[#49454F]">
                                    {
                                        ShopHistoryData[7]
                                            ?.ImportantNotice2
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="flex pb-[10px]">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM14.79 12.53L11.26 16.06C11.11 16.21 10.92 16.28 10.73 16.28C10.54 16.28 10.35 16.21 10.2 16.06C9.91 15.77 9.91 15.29 10.2 15L13.2 12L10.2 9C9.91 8.71 9.91 8.23 10.2 7.94C10.49 7.65 10.97 7.65 11.26 7.94L14.79 11.47C15.09 11.76 15.09 12.24 14.79 12.53Z"
                                        fill="#1D192B"/>
                                </svg>
                                <div className="tex-[14px] ps-[10px] font-[500]">
                                    Package details
                                </div>
                            </div>
                        
                            <div
                                className="mt-[5px] pb-[15px] w-[725px] bg-white rounded-[20px] border text-[14px] font-[500]">
                                <div
                                    className="flex items-center justify-between rounded-t-[20px] border bg-[#F4EFF4] px-[30px] py-[20px] ">
                                    <div className="w-[200px]">Items</div>
                                    <div className="w-[150px]">Item URL</div>
                                    <div className="w-[100px]">Item Cost from StoreL</div>
                                    <div className="w-[55px]">Quantity of items</div>
                                    <div className="w-[75px]">Total value of item</div>
                                </div>

                                <>
                                    {
                                    ItemData.map((item) => {
                                        return <div
                                                    className="flex items-center justify-between bg-white pb-[20px] mx-[30px] my-[20px] border-b">
                                                    <div className="w-[200px]">
                                                        <img src={`/images/${item?.ItemSrc}.svg`}></img>
                                                        <div>
                                                            {item?.Item}
                                                        </div>
                                                    </div>
                                                    <div className="flex w-[150px]">
                                                        {item?.ItemUrl}
                                                    </div>
                                                    <div className="w-[100px]">{item?.ItemCost}</div>
                                                    <div className="w-[55px]">{item?.ItemQuantity}</div>
                                                    <div className="w-[77px]">{item?.TotalValue}</div>
                                                </div>
                                                
                                            }
                                    )}
                                </>

                                <div
                                    className="flex items-center justify-between bg-[#FFFBFE] px-[30px] pt-[10px]">

                                    <div className="w-[215px]">
                                        <div className="w-[100px]">Total number of items:</div>
                                    </div>
                                    <div className="w-[215px]">
                                        <div className="w-[100px]">Total Gross weight:</div>
                                    </div>
                                    <div className="w-[215px]">
                                        <div className="w-[125px]">Total Items Cost from Store:</div>
                                    </div>
                                </div>

                                <div
                                    className="flex items-center justify-between bg-white text-[22px] px-[30px] py-[5px]">
                                    <div className="w-[215px]">
                                        {
                                            ShopHistoryData[8]
                                                ?.TotalNumber
                                        }
                                    </div>
                                    <div className="w-[215px]">
                                        {
                                            ShopHistoryData[8]
                                                ?.TotalWeight
                                        }
                                    </div>
                                    <div className="w-[215px]">
                                        {
                                            ShopHistoryData[8]
                                                ?.TotalCost
                                        }
                                    </div>
                                </div>

                                <div className="flex items-center justify-between bg-white px-[30px] pt-[10px]">

                                    <div className="w-[215px]">
                                        <div className="w-[100px]">Total number of items:</div>
                                    </div>
                                    <div className="w-[215px]">
                                        <div className="w-[100px]">Total Gross weight:</div>
                                    </div>
                                    <div className="w-[215px]">
                                        <div className="w-[125px]">Total Items Cost from Store:</div>
                                    </div>
                                </div>

                                <div
                                    className="flex items-center justify-between bg-white text-[22px] px-[30px] py-[5px]">
                                    <div className="w-[215px]">
                                        {
                                            ShopHistoryData[8]
                                                ?.ProcessingFee
                                        }
                                    </div>
                                    <div className="w-[215px]">
                                        {
                                            ShopHistoryData[8]
                                                ?.PurchaseFee
                                        }
                                    </div>
                                    <div className="w-[215px]">
                                        {
                                            ShopHistoryData[8]
                                                ?.TotalMeCost
                                        }
                                    </div>
                                </div>

                            </div>

                        

                         {/* <div
                            className="mt-[5px] pb-[15px] w-[661px] bg-white rounded-[20px] border text-[14px] font-[500]">
                            <div
                                className="flex items-center justify-between rounded-t-[20px] border bg-[#F4EFF4] px-[30px] py-[20px] ">
                                <div className='flex '>
                                    <div className="w-[231.54px]">Items</div>
                                    <div className="w-[54px]">Value per item</div>
                                </div>
                                <div className="w-[55px]">Quantity of items</div>
                                <div className="w-[73px]">Total value of item</div>
                            </div>

                            <>
                                    {
                                    ItemData.map((item) => {
                                        return <div
                                                    className="flex items-center justify-between bg-white pb-[20px] mx-[30px] my-[20px] border-b">
                                                    <div className="w-[231.54px]">
                                                        <img src={`/images/${item?.ItemSrc}.svg`}></img>
                                                        <div>
                                                            {item?.Item}
                                                        </div>
                                                    </div>
                                                    <div className="w-[54px]">{item?.ItemCost}</div>
                                                    <div className="w-[55px]">{item?.ItemQuantity}</div>
                                                    <div className="w-[73px]">{item?.TotalValue}</div>
                                                </div>
                                                
                                            }
                                    )}
                                </>




                            <div
                                className="flex items-center justify-between bg-[#FFFBFE] px-[30px] pt-[10px]">

                                <div className="w-[215px]">
                                    <div className="w-[100px]">Total number of items:</div>
                                </div>
                                <div className="w-[215px]">
                                    <div className="w-[100px]">Total Gross weight:</div>
                                </div>
                                <div className="w-[215px]">
                                    <div className="w-[125px]">Total Items Cost from Store:</div>
                                </div>
                            </div>

                            <div
                                className="flex items-center justify-between bg-white text-[22px] px-[30px] py-[5px]">
                                <div className="w-[215px]">
                                    6
                                </div>
                                <div className="w-[215px]">
                                    30lbs
                                </div>
                                <div className="w-[215px]">
                                    $345.00
                                </div>
                            </div>

                            <div className="flex items-center justify-between bg-white px-[30px] pt-[10px]">

                                <div className="w-[215px]">
                                    <div className="w-[100px]">Total number of items:</div>
                                </div>
                                <div className="w-[215px]">
                                    <div className="w-[100px]">Total Gross weight:</div>
                                </div>
                                <div className="w-[215px]">
                                    <div className="w-[125px]">Total Items Cost from Store:</div>
                                </div>
                            </div>

                            <div
                                className="flex items-center justify-between bg-white text-[22px] px-[30px] py-[5px]">
                                <div className="w-[215px]">
                                    $345.00
                                </div>
                                <div className="w-[215px]">
                                    $0.00
                                </div>
                                <div className="w-[215px]">
                                    $0.00
                                </div>
                            </div>

                        </div> */}

                    </div>

                    </div>

                    <div className="flex flex-col">
                        <div className="flex pb-[10px]">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM14.79 12.53L11.26 16.06C11.11 16.21 10.92 16.28 10.73 16.28C10.54 16.28 10.35 16.21 10.2 16.06C9.91 15.77 9.91 15.29 10.2 15L13.2 12L10.2 9C9.91 8.71 9.91 8.23 10.2 7.94C10.49 7.65 10.97 7.65 11.26 7.94L14.79 11.47C15.09 11.76 15.09 12.24 14.79 12.53Z"
                                    fill="#1D192B"/>
                            </svg>
                            <div className="tex-[14px] ps-[10px] font-[500]">
                                Costs breakdown
                            </div>
                        </div>

                        <div
                            className="py-[10px] px-[14px] rounded-[20px] border text-[14px] font-[500] bg-[#21005D] text-white">
                            <div
                                className="flex items-center justify-between text-[22px] mx-[14px] py-[10px] mb-[10px]">
                                Order Costs Summary
                            </div>

                            <>
                                { OrderItem1.map((item) => {
                           return <div className="flex items-center justify-between py-[10px] mx-[14px] border-b">
                                <div>{item[0]}</div>
                                <div>
                                    {
                                        item[0] != "Discount:" ? (
                                            <div>${item[1]}</div>
                                        ) : (
                                            <div>-${item[1]}</div>
                                        )
                                    }
                                </div>
                            </div>
                        })}
                                </>
                            <div className="flex items-center justify-between pt-[10px] mx-[14px] my-[5px]">
                                Total:
                            </div>
                            <div
                                className="flex items-center justify-between text-[22px] mx-[14px] mb-[5px]">
                                $126.66
                            </div>
                            <div className="flex items-center justify-between mx-[14px] mb-[10px]">
                                The Naira Equivalent you will be charged now is ₦20,000
                            </div>

                        </div>

                    </div>
                    <div className="py-[5px]">
                        <div className="flex px-[20px] py-[2px] items-center">
                            <img src="/images/arrow-right.svg"></img>
                            <div className="ms-[10px]">Our current exchange rate which is subjected to
                                change according to market trends is ($1=₦1,200), you will be charged the Naira
                                Equivalent of the shipping cost based on the current exchange rate at any given
                                time/point of payment</div>
                        </div>
                        <div className="flex px-[20px] py-[2px] items-center">
                            <img src="/images/arrow-right-red.svg"></img>
                            <div className="ms-[10px]">The total you are paying now includes only the
                                Shop-for-me cost and excludes Shipment Cost which you are to pay upon
                                arrival/clearing of your package</div>
                        </div>
                        <div className="flex px-[20px] py-[2px] items-center">
                            <img src="/images/arrow-right.svg"></img>
                            <div className="ms-[10px]">Prices and subtotals are displayed including taxes</div>
                        </div>
                        <div className="flex px-[20px] py-[2px] items-center">
                            <img src="/images/arrow-right.svg"></img>
                            <div className="ms-[10px]">Discounts are calculated based on prices and
                                subtotals taken without considering taxes</div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            className="btn relative flex h-[40px] w-[410px] items-center justify-center gap-x-2 rounded-[6.25rem] bg-[#B3261E] px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:ps-1">
                            <img src="/images/icon.svg"></img>
                            <div className="font-robot color-white text-[14px] font-[500]">
                                Pay Now
                            </div>
                        </button>
                    </div>
                    {/* <div className='w-full'>
                        <div className="flex">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM14.79 12.53L11.26 16.06C11.11 16.21 10.92 16.28 10.73 16.28C10.54 16.28 10.35 16.21 10.2 16.06C9.91 15.77 9.91 15.29 10.2 15L13.2 12L10.2 9C9.91 8.71 9.91 8.23 10.2 7.94C10.49 7.65 10.97 7.65 11.26 7.94L14.79 11.47C15.09 11.76 15.09 12.24 14.79 12.53Z"
                                        fill="#1D192B"/>
                                </svg>
                                <div className="tex-[14px] ps-[10px]">
                                    Transaction details
                                </div>
                            </div>

                            <div
                                className="flex w-full justify-between max-sm:flex-col rounded-[20px] border border-solid border-[#CAC4D0] px-[5px] my-[10px]">
                                <div
                                    className="flex-col w-[200px] items-center mb-[10px] mt-[6px] ms-[20px] max-sm:ms-[10px]">
                                    <div className="text-[14px]">Transaction ID:</div>
                                    <div className="text-[16px]">{ShopHistoryData[9]?.TransactionID}</div>
                                </div>
                                <div
                                    className="flex-col w-[200px] items-center mb-[10px] mt-[6px] ms-[20px] max-sm:ms-[10px]">
                                    <div className="text-[14px]">Transaction Date</div>
                                    <div className="text-[16px]">{ShopHistoryData[9]?.TransactionData}</div>
                                </div>
                            </div>
                        </div> */}

                    <div className="flex justify-center mt-[20px]">
                        <button
                            className="btn relative flex h-[40px] w-[205px] items-center justify-center gap-x-2 rounded-[6.25rem] bg-white border-solid border-[1px] mx-[5px] px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:ps-1">
                            <img src="/images/printer.svg"></img>
                            <div className="font-robot text-[#6750A4] text-[14px] font-[500]">
                                Print
                            </div>
                        </button>
                        <button
                            className="btn relative flex h-[40px] w-[205px] items-center justify-center gap-x-2 rounded-[6.25rem] bg-[#6750A4] mx-[5px] px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:ps-1">
                            <img src="/images/receive-square.svg"></img>
                            <div className="font-robot text-white text-[14px] font-[500]">
                                Download
                            </div>
                        </button>
                    </div>

                </div>
            </div>
      
    );
};

export default ShopHistory;
