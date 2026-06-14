import { useState, useRef, useEffect } from "react";

const STORAGE_KEY = "egn_store_data_v1";

const DEFAULT_CATEGORIES = ["Market Items", "Wet & Frozen", "Dry Goods", "Meat Products", "Condiments", "Plastic Supplies"];

const defaultPrices = {
  // ── Synced from Loyverse Back End (EGN STORE prices) ──
  "Repolyo": 60, "Carrots": 140, "Patatas": 90, "Ombok": 80, "Sayote": 60,
  "Celery": 120, "Sang": 150, "Red Bell Pepper": 200, "Green Bell Pepper": 200,
  "Labanos": 60, "Brocolly": 80, "Colly Flower": 100, "Baguio Beans": 150,
  "Pipino": 90, "Gree Ice Lettuce": 80, "Lemon": 220, "Ampalaya": 150,
  "Sitaw": 35, "Okra": 7, "Gabi": 70, "Talong": 90, "Petchay": 12,
  "Mustasa": 20, "Dahon Sili": 20, "Sili Red": 250, "Sili Green": 120,
  "Kangkong": 15, "Kamote": 70, "Sampalok": 80, "Kalamansi": 130,
  "Kalabasa": 70, "Patola": 90, "Puso Saging": 90, "White Corn": 80,
  "Yellow Corn": 80, "Kamatis": 50, "Sibuyas White": 80, "Sibuyas Red": 130,
  "Bawang": 150, "Luya": 150, "Togue": 60, "Tokwa": 35, "Pabalat Big": 40,
  "Pabalat Small": 40, "Miki": 20, "Bagoong": 12, "Buru Nasi": 20,
  "Tilapia": 150, "Bangus": 250, "Daing Bangus Styro": 80, "Bangus by 3pcs": 185,
  "Galonggong": 280, "Hapimi Canton 500g": 70, "Ordinary Canton 400g": 55,
  "Canton 200g": 30, "White Bihon 500g": 60, "Pagoda 500g": 65,
  "Super Q 500g": 40, "Komeya 500g": 35, "Monggo 1Kg": 150,
  "Tausi Yellow": 25, "Tausi Black": 25, "Fried Bawang 1Kg": 145,
  "Chili Flakes 1kg": 220, "Alysa Toyo Galon": 85, "ALysa Toyo Liter": 35,
  "Alysa Vinegar Galon": 80, "Alysa Vinegar Liter": 35, "Alysa Patis Galon": 85,
  "Alysa Ketchup Galon": 110, "Dip Ketchup Galon": 110, "Dip Ketchup Liter": 40,
  "Dip Toyo Galon": 95, "Chicken": 200, "Chicken Atay": 250, "Chicken Backneck": 120,
  "Pork Jowls / Pisngi": 230, "Pork Ears / Tenga": 170, "Pork Shoulder / Kasim": 260,
  "Pork Belly / Liempo": 330, "Porkchop": 260, "Beef Meat / Laman Baka": 380,
  // ── Condiments (synced from export_items.csv) ──
  "Magic Sarap 8g": 6,
  "Magic Sarap 100g": 35,
  "Ajinomoto Vetsin 11g": 5,
  "Ajinomoto Vetsin 24g": 8,
  "Ajinomoto Vetsin 100g": 35,
  "Ajinomoto Vetsin 250g": 70,
  "Ajinomoto Vetsin 500g": 120,
  "Ajinomoto Vetsin 1kg": 220,
  "Knorr Sinigang Mix 22g": 18,
  "Knorr Sinigang Mix 44g": 30,
  "Knorr Sinigang Gabi Mix 22g": 18,
  "Knorr Sinigang Gabi Mix 44g": 30,
  "Knorr Chicken Cubes": 7,
  "Knorr Pork Cubes": 7,
  "Knorr Beef Cubes": 7,
  "Knorr Shrimp Cubes": 7,
  "Knorr Crab and Corn 60g": 55,
  "Knorr Cream of Mushroom 68g": 55,
  "Knorr Seasoning 12ml": 12,
  "Knorr Seasoning 130ml": 62,
  "Knorr Seasoning 250ml": 100,
  "Knorr Ginataang Gulay": 18,
  "Mamasitas Oyster Sauce 30g": 8,
  "Mamasitas Oyster Sauce 60g": 17,
  "Mamasitas Oyster Sauce 90g": 25,
  "Mamasitas Oyster Sauce 150g": 42,
  "Mamasitas Oyster Sauce 156g": 63,
  "Mamasitas Oyster Sauce 405g": 110,
  "Mamasitas Oyster Sauce 765g": 185,
  "Mamasitas BBQ Marinade 80ml": 20,
  "Mamasitas BBQ Marinade 150ml (Doy)": 38,
  "Mamasitas BBQ Marinade 150ml": 62,
  "Mamasitas BBQ Marinade 350ml": 105,
  "Mamasitas BBQ Marinade 680ml": 165,
  "Mamasitas Anato Powder": 25,
  "Mamasitas Caldereta": 40,
  "Mamasitas Kare - Kare": 40,
  "Mamasitas Menudo": 36,
  "Mamasitas Sinigang Bayabas": 37,
  "Mamasitas Sisig": 42,
  "Mamasitas Papaitan": 42,
  "Mamasitas Chopseouy": 42,
  "UFC Banana Ketchup 100g": 15,
  "UFC Banana Ketchup 200g": 22,
  "UFC Banana Ketchup 320g": 32,
  "UFC Banana Ketchup 530g": 50,
  "UFC Banana Ketchup 1KG": 72,
  "UFC Chili Sauce 340g": 45,
  "Delmonte Sweet Blend 320g": 35,
  "Delmonte Sweet Blend Bottle 320g": 50,
  "Delmonte TSauce Original 115g": 22,
  "Delmonte TSauce Original 200g": 27,
  "Delmonte TSauce Original 250g": 30,
  "Delmonte TSauce Original 900g": 95,
  "Delmonte Tsauce Filipino Style 90g": 15,
  "Delmonte Tsauce Filipino Style 200g": 25,
  "Delmonte Tsauce Filipino Style 250g": 28,
  "Delmonte Tsauce Filipino Style 900g": 85,
  "Delmonte Sweet Spaghetti Sauce 500g": 75,
  "Delmonte Sweet Spaghetti Sauce 900g": 105,
  "Delmonte Pineapple Ace 240ml": 32,
  "Delmonte Pineapple Ace 530ml": 60,
  "Delmonte Pineapple Ace 1Liter": 125,
  "Delmonte Tidbits 115g": 20,
  "Delmonte Tidbits 200g": 32,
  "Delmonte Tomato Paste 70g": 22,
  "Delmonte Tomato Paste 150g": 35,
  "Delmonte Spaghetti W/ Sauce Fil": 150,
  "Delmonte Spaghetti W/ Sauce Sweet": 150,
  "Fiesta Sweet Spaghetti W/ Sauce": 140,
  "Fiesta Creamy Carbonara W/ Sauce": 150,
  "Datu Puti Vinegar 200ml": 10,
  "Datu Puti Vinegar 340ml": 20,
  "Datu Puti Vinegar 1L": 48,
  "Datu Puti Soy Sauce 200ml": 13,
  "Datu Puti Soy Sauce 340ml": 22,
  "Datu Puti Soy Sauce 1L": 55,
  "Datu Puti Patis 150ml": 17,
  "Datu Puti Patis 350ml": 28,
  "Datu Puti Patis 1L": 77,
  "Select Soy Sauce 200ml": 10,
  "Select Soy Sauce 350ml": 18,
  "Select Soy Sauce 1L": 48,
  "Select Soy Sauce 1G": 170,
  "Select Partner Pack 1L": 85,
  "Campbells Mushroom 284ML": 95,
  "JemJ Whole Kernel Corn 425g": 40,
  "JemJ Cream Style Corn 425g": 40,
  "TaiHing Mushroom Pieces 198g": 35,
  "TaiHing Mushroom Pieces 425g": 45,
  "TaiHing Mushroom Choice Whole 425g": 48,
  "Ram Green Peas 225g": 35,
  "Ram Pork and Beans 220g": 35,
  "Ram Garbanzos 225g": 35,
  "Ram Salted Black Beans 100g": 20,
  "Reno Liver Spread 230g": 35,
  "Reno Liver Spread 85g": 70,
  "Alaska Evaporada 360ml": 37,
  "Alaska Evaporada 140ml": 22,
  "Alaska Classic Evaporated 360ml": 58,
  "Jersey Evaporada 370ml": 33,
  "Jersey Condensed 390g": 45,
  "Jersey Chocolate 390g": 57,
  "Jersey Melon 390g": 57,
  "Jersey Ube 390g": 60,
  "Jersey All Purpose Cream 250ml": 50,
  "Nestle All Purpose Cream 250ml": 75,
  "OK Cheeze 500g": 120,
  "OK Cheeze 200g": 50,
  "Bigtime Cheese 430g": 100,
  "Bigtime Cheese 160g": 45,
  "Eden Cheeze 430g": 148,
  "Eden Cheeze 160g": 58,
  "Eden Cheeze 45g": 20,
  "Nescafe Classic 20g": 28,
  "Nescafe Classic 40g": 55,
  "Nescafe Classic 80g": 105,
  "Nescafe Coffee Mate 150g": 50,
  "Nescafe Coffee Mate 220g": 67,
  "Nescafe Coffee Mate 400g": 115,
  "Nescafe Creamy White Twin Pack": 16,
  "Nescafe Original Twin Pack": 16,
  "Kopiko Blanca Twin Pack": 15,
  "Kopiko Brown Twin Pack": 15,
  "Energen Champion Twin Pack": 20,
  "Bearbrand Swak 33g": 13,
  "Milo 24g": 12,
  "Injoy Cheese Powder 200g": 35,
  "Injoy Melon 500g": 135,
  "Injoy Choco Malt 500g": 135,
  "Injoy Pandan 500g": 135,
  "Tasty Pineapple 500g": 115,
  "Tasty Calamansi 500g": 130,
  "Tasty Cucumber 500g": 155,
  "Tasty Blue Lemonade 500g": 135,
  "Tasty Lemon Ice Tea 500g": 135,
  "Tasty Sagot Gulaman 500g": 115,
  "Cheemag Black Gulaman 500g": 105,
  "Cheemag Black Gulaman 1Kg": 185,
  "Cheemag Red Ice tea 500g": 120,
  "Cheemag Ice Tea 500g": 120,
  "Cheemag Ice Tea 1Kg": 220,
  "Nan Yuan BreadCrumbs 230g": 40,
  "Nan Yuan BreadCrumbs 80g": 20,
  "Oysterrific Oyster Sauce 70g": 16,
  "Energen Champion Twinpack": 20,
  "Mr Gulaman Yellow": 16,
  "Mr Gulaman Red": 16,
  "Mr Gulaman Green": 16,
  "Mr Gulaman Black": 16,
  "Mr Gulaman Buko Pandan": 16,
  "Glutinous Rice Flour 500g": 45,
  "Mexican Hot Sauce 1G": 155,
  "Mexican Hot Sauce 1L": 50,
  "Red Label Hot Sauce 1G": 155,
  "Rose Vinegar 3.78Liter": 145,
  "Rose Vinegar 385ml": 18,
  "Rose Vinegar 200ml": 10,
  "Didis Peanut Butter 250g": 65,
  "Didis Peanut Butter 500g": 105,
  "Didis Peanut Butter 620g": 120,
  "Ligo Sardines Red 425g": 60,
  "Ligo Sardines Red 155g": 30,
  "Ligo Sardines Green 425g": 60,
  "Ligo Sardines Green 155g": 30,
  "555 Sardines Red 425g": 60,
  "555 Sardines Red 155g": 30,
  "555 Sardines Green 425g": 60,
  "555 Sardines Green 155g": 60,
  "Argentina Meat Loaf 170g": 35,
  "Argentina Cornbeef 175g": 50,
  "Argentina Cornbeef 260g": 60,
  "Argentina Giniling 250g": 60,
  "Century Tuna Spicy 420g": 110,
  "Century Tuna Spicy 155g": 50,
  "Century Tuna Flakes 420g": 110,
  "Century Tuna Flakes 155g": 37,
  "Century Tuna Flakes 180g": 50,
  "Century Tuna Spicy 180g": 50,
  "San Marino Chili 150g": 40,
  "San Marino Chili 80g": 35,
  "San Marino Corned Tuna 150g": 40,
  "San Marino Chili 180g": 50,
  "San Marino Corned Tuna 180g": 50,
  "San Marino Corned Tuna 80g": 35,
  "Maling Luncheon Chicken 397g": 117,
  "Ideal Elbow 200g": 20,
  "Ideal Elbow 5Kg": 320,
  "Ideal Shell 200g": 20,
  "Ideal Shell 5Kg": 320,
  "Ideal Penny 5Kg": 320,
  "Sunmac Superghetti 1.6Kg": 110,
  "Sunmac Spaghetti 400g": 45,
  "Sunmac Spaghetti 800g": 85,
  "Sunshine Sauceyghetti 900g": 120,
  "Tim Barbeque Marinade 80ml": 25,
  "Tim Oyster Sauce 90g": 25,
  "Coco Mama Fresh Gata 200ml": 35,
  "Coco Mama Fresh Gata 400ml": 75,
  "Hansung Luncheon Meat 340g": 85,
  "Hansung Luncheon Meat Chicken 340g": 85,
  "Dongwon Luncheon Meat 340g": 95,
  "Dak Pork Luncheon Meant 340g": 95,
  "Gochujang Hot Red Pepper Paste 170g": 55,
  "Ssamjang Green Soybean Paste 170g": 55,
  "Japchea 500g": 100, "Sotanghon 18oz": 12, "Sotanghon 40g": 22,
  "Sotanghon 200g": 40, "Sotanghon 400g": 65, "Sotanghon 800g": 130,
  "Rnb Ketchup Gallon": 85, "Rnb Ketchup Liter": 35, "BBQ Ketchup Gallon": 95,
  "Dressing IL": 75, "Dressing 200ml": 20, "Dressing Gallon": 200,
  "Monaco Gallon": 880, "Monaco 1L": 280, "Monaco 200ml": 85, "Monaco 1Kg": 300,
  "Golden Egg Gallon": 455, "Golden Egg 1L": 150, "Golden Egg 200ml": 45,
  "Snow White Gallon": 200, "Snow White 1L": 75, "Ladies Choice Galon": 1100,
  "Ladies Choice 1Kg": 400, "Ladies Choice 80ml": 35, "Ladies Choice 200ml": 100,
  "Picnic 1/4": 60, "Picnic 1/2": 115, "Picnic J4 1Kg": 190, "Picnic J6 1Kg": 190,
  "Picnic J4 2.5Kg": 435, "Picnic J6 2.5Kg": 435, "CDO Idol 1/4": 55,
  "CDO Idol 1/2": 110, "CDO Franks 1/2": 110, "CDO Young Pork 1/4": 65,
  "CDO Young Pork 1/2": 125, "CDO Burger by 6": 57, "CDO Burger by 24": 195,
  "CDO Crispy Burger": 60, "PB Toc 1/4": 65, "PB Toc 1/2": 125,
  "Mekeni Slice Ham": 57, "Mekeni Loaf Ham": 57, "Roels Hotdog 1/4": 45,
  "Roels Hotdog 2.5Kg": 395, "Roels Cornbeef 500g": 50, "Roels Groundbeef 500g": 135,
  "Bossing Hotdog 1kg": 160, "Bossing Cheeze 1kg": 170, "Bossing Chicken 1Kg": 170,
  "Zippy Hotdog 1kg": 150, "Angelenos Chicken Hotdog": 46, "Mekeni Hungarian": 125,
  "Luncheon Meat": 55, "Dona Carmelita Burger": 50, "Dona Cammile Pork Siomai": 120,
  "Dona Camille Chicken Siomai": 120, "Dona Camille Beef Siomai": 125,
  "Holiday Beef Siomai": 145, "Bayani Beef Siomai": 145, "TJ J4 1Kg": 195,
  "TJ J6 1Kg": 195, "TJ J4 3Kg": 495, "TJ J6 3Kg": 495,
  "Purefoods Nuggets Green": 60, "Purefoods Nuggets Breast": 60,
  "French Fries 1Kg": 110, "Cheestick": 35, "Fishball 1Kg": 50,
  "Kikiam 1/2Kg": 45, "Chickenball 1/2Kg": 50, "Squidball 1/2Kg": 55,
  "Shanghai Kikiam 1/2Kg": 50, "Roels Skinless Longanisa": 50,
  "SEMS Longanisa by 12": 38, "SEMS Longanisa by 6": 38, "SEMS Smoke Longanisa": 40,
  "SEMS Pork Siomai 1/2": 60, "SEMS Pork Siomai 1/4": 35,
  "SEMS Chicken Siomai 1/2": 60, "SEMS Chicken Siomai 1Kg": 110,
  "SEMS Beef Siomai 1/2Kg": 60, "SEMS Beef Siomai 1/4Kg": 35,
  "Embotido by 5": 50, "Chicken Macau 1/4": 50, "Pork Macau 1/4": 50,
  "Dairy Cream Big": 75, "Dairy Cream Small": 45, "Crabstick": 65,
  "Mix Vegetables": 135, "Green Peas": 135, "Mekeni Bacon": 90,
};

const defaultItems = {
  "Market Items": ["Repolyo","Carrots","Patatas","Ombok","Sayote","Celery","Sang","Red Bell Pepper","Green Bell Pepper","Labanos","Brocolly","Colly Flower","Baguio Beans","Pipino","Gree Ice Lettuce","Lemon","Ampalaya","Sitaw","Okra","Gabi","Talong","Petchay","Mustasa","Dahon Sili","Sili Red","Sili Green","Kangkong","Kamote","Sampalok","Kalamansi","Kalabasa","Patola","Puso Saging","White Corn","Yellow Corn","Kamatis","Sibuyas White","Sibuyas Red","Bawang","Luya","Togue","Tokwa","Pabalat Big","Pabalat Small","Miki","Bagoong","Buru Nasi","Tilapia","Bangus","Daing Bangus Styro","Bangus by 3pcs","Galonggong","Hapimi Canton 500g","Ordinary Canton 400g","Canton 200g","White Bihon 500g","Pagoda 500g","Super Q 500g","Komeya 500g","Monggo 1Kg","Tausi Yellow","Tausi Black","Fried Bawang 1Kg","Chili Flakes 1kg","Alysa Toyo Galon","ALysa Toyo Liter","Alysa Vinegar Galon","Alysa Vinegar Liter","Alysa Patis Galon","Alysa Ketchup Galon","Dip Ketchup Galon","Dip Ketchup Liter","Dip Toyo Galon","Chicken","Chicken Atay","Chicken Backneck"],
  "Wet & Frozen": ["Chicken","Chicken Atay","Chicken Backneck","Tilapia","Bangus","Daing Bangus Styro","Bangus by 3pcs","Galonggong","Pork Jowls / Pisngi","Pork Ears / Tenga","Pork Shoulder / Kasim","Pork Belly / Liempo","Porkchop","Beef Meat / Laman Baka"],
  "Dry Goods": ["Hapimi Canton 500g","Ordinary Canton 400g","Canton 200g","White Bihon 500g","Japchea 500g","Pagoda 500g","Super Q 500g","Komeya 500g","Monggo 1Kg","Fried Bawang 1Kg","Sotanghon 18oz","Sotanghon 40g","Sotanghon 200g","Sotanghon 400g","Sotanghon 800g","Alysa Toyo Galon","ALysa Toyo Liter","Alysa Vinegar Galon","Alysa Vinegar Liter","Alysa Patis Galon","Alysa Ketchup Galon","Dip Ketchup Galon","Dip Ketchup Liter","Dip Toyo Galon","Rnb Ketchup Gallon","Rnb Ketchup Liter","BBQ Ketchup Gallon","Dressing IL","Dressing 200ml","Dressing Gallon","Monaco Gallon","Monaco 1L","Monaco 200ml","Monaco 1Kg","Golden Egg Gallon","Golden Egg 1L","Golden Egg 200ml","Snow White Gallon","Snow White 1L","Ladies Choice Galon","Ladies Choice 1Kg","Ladies Choice 80ml","Ladies Choice 200ml"],
  "Meat Products": ["Picnic 1/4","Picnic 1/2","Picnic J4 1Kg","Picnic J6 1Kg","Picnic J4 2.5Kg","Picnic J6 2.5Kg","CDO Idol 1/4","CDO Idol 1/2","CDO Franks 1/2","CDO Young Pork 1/4","CDO Young Pork 1/2","CDO Burger by 6","CDO Burger by 24","CDO Crispy Burger","PB Toc 1/4","PB Toc 1/2","Mekeni Slice Ham","Mekeni Loaf Ham","Roels Hotdog 1/4","Roels Hotdog 2.5Kg","Roels Cornbeef 500g","Roels Groundbeef 500g","Bossing Hotdog 1kg","Bossing Cheeze 1kg","Bossing Chicken 1Kg","Zippy Hotdog 1kg","Angelenos Chicken Hotdog","Mekeni Hungarian","Luncheon Meat","Dona Carmelita Burger","Dona Cammile Pork Siomai","Dona Camille Chicken Siomai","Dona Camille Beef Siomai","Holiday Beef Siomai","Bayani Beef Siomai","TJ J4 1Kg","TJ J6 1Kg","TJ J4 3Kg","TJ J6 3Kg","Purefoods Nuggets Green","Purefoods Nuggets Breast","French Fries 1Kg","Cheestick","Fishball 1Kg","Kikiam 1/2Kg","Chickenball 1/2Kg","Squidball 1/2Kg","Shanghai Kikiam 1/2Kg","Roels Skinless Longanisa","SEMS Longanisa by 12","SEMS Longanisa by 6","SEMS Smoke Longanisa","SEMS Pork Siomai 1/2","SEMS Pork Siomai 1/4","SEMS Chicken Siomai 1/2","SEMS Chicken Siomai 1Kg","SEMS Beef Siomai 1/2Kg","SEMS Beef Siomai 1/4Kg","Embotido by 5","Chicken Macau 1/4","Pork Macau 1/4","Dairy Cream Big","Dairy Cream Small","Crabstick","Mix Vegetables","Green Peas","Mekeni Bacon"],
  "Condiments": ["Magic Sarap 8g","Magic Sarap 100g","Ajinomoto Vetsin 11g","Ajinomoto Vetsin 24g","Ajinomoto Vetsin 100g","Ajinomoto Vetsin 250g","Ajinomoto Vetsin 500g","Ajinomoto Vetsin 1kg","Knorr Sinigang Mix 22g","Knorr Sinigang Mix 44g","Knorr Sinigang Gabi Mix 22g","Knorr Sinigang Gabi Mix 44g","Knorr Chicken Cubes","Knorr Pork Cubes","Knorr Beef Cubes","Knorr Shrimp Cubes","Knorr Crab and Corn 60g","Knorr Cream of Mushroom 68g","Knorr Seasoning 12ml","Knorr Seasoning 130ml","Knorr Seasoning 250ml","Knorr Ginataang Gulay","Mamasitas Oyster Sauce 30g","Mamasitas Oyster Sauce 60g","Mamasitas Oyster Sauce 90g","Mamasitas Oyster Sauce 150g","Mamasitas Oyster Sauce 156g","Mamasitas Oyster Sauce 405g","Mamasitas Oyster Sauce 765g","Mamasitas BBQ Marinade 80ml","Mamasitas BBQ Marinade 150ml (Doy)","Mamasitas BBQ Marinade 150ml","Mamasitas BBQ Marinade 350ml","Mamasitas BBQ Marinade 680ml","Mamasitas Anato Powder","Mamasitas Caldereta","Mamasitas Kare - Kare","Mamasitas Menudo","Mamasitas Sinigang Bayabas","Mamasitas Sisig","Mamasitas Papaitan","Mamasitas Chopseouy","UFC Banana Ketchup 100g","UFC Banana Ketchup 200g","UFC Banana Ketchup 320g","UFC Banana Ketchup 530g","UFC Banana Ketchup 1KG","UFC Chili Sauce 340g","Delmonte Sweet Blend 320g","Delmonte Sweet Blend Bottle 320g","Delmonte TSauce Original 115g","Delmonte TSauce Original 200g","Delmonte TSauce Original 250g","Delmonte TSauce Original 900g","Delmonte Tsauce Original 1Kg","Delmonte Tsauce Filipino Style 90g","Delmonte Tsauce Filipino Style 200g","Delmonte Tsauce Filipino Style 250g","Delmonte Tsauce Filipino Style 900g","Delmonte Tsauce Filipino Style 1Kg","Delmonte Sweet Spaghetti Sauce 500g","Delmonte Sweet Spaghetti Sauce 900g","Delmonte Pineapple Ace 240ml","Delmonte Pineapple Ace 530ml","Delmonte Pineapple Ace 1Liter","Delmonte Tidbits 115g","Delmonte Tidbits 200g","Delmonte Tomato Paste 70g","Delmonte Tomato Paste 150g","Delmonte Spaghetti W/ Sauce Fil","Delmonte Spaghetti W/ Sauce Sweet","Fiesta Sweet Spaghetti W/ Sauce","Fiesta Creamy Carbonara W/ Sauce","Datu Puti Vinegar 200ml","Datu Puti Vinegar 340ml","Datu Puti Vinegar 1L","Datu Puti Soy Sauce 200ml","Datu Puti Soy Sauce 340ml","Datu Puti Soy Sauce 1L","Datu Puti Patis 150ml","Datu Puti Patis 350ml","Datu Puti Patis 1L","Select Soy Sauce 200ml","Select Soy Sauce 350ml","Select Soy Sauce 1L","Select Soy Sauce 1G","Select Partner Pack 1L","Campbells Mushroom 284ML","JemJ Whole Kernel Corn 425g","JemJ Cream Style Corn 425g","TaiHing Mushroom Pieces 198g","TaiHing Mushroom Pieces 425g","TaiHing Mushroom Choice Whole 425g","Ram Green Peas 225g","Ram Pork and Beans 220g","Ram Garbanzos 225g","Ram Salted Black Beans 100g","Reno Liver Spread 230g","Reno Liver Spread 85g","Alaska Evaporada 360ml","Alaska Evaporada 140ml","Alaska Classic Evaporated 360ml","Jersey Evaporada 370ml","Jersey Condensed 390g","Jersey Chocolate 390g","Jersey Melon 390g","Jersey Ube 390g","Jersey All Purpose Cream 250ml","Nestle All Purpose Cream 250ml","OK Cheeze 500g","OK Cheeze 200g","Bigtime Cheese 430g","Bigtime Cheese 160g","Eden Cheeze 430g","Eden Cheeze 160g","Eden Cheeze 45g","Nescafe Classic 20g","Nescafe Classic 40g","Nescafe Classic 80g","Nescafe Coffee Mate 150g","Nescafe Coffee Mate 220g","Nescafe Coffee Mate 400g","Nescafe Creamy White Twin Pack","Nescafe Original Twin Pack","Kopiko Blanca Twin Pack","Kopiko Brown Twin Pack","Energen Champion Twin Pack","Bearbrand Swak 33g","Milo 24g","Injoy Cheese Powder 200g","Injoy Melon 500g","Injoy Choco Malt 500g","Injoy Pandan 500g","Tasty Pineapple 500g","Tasty Calamansi 500g","Tasty Cucumber 500g","Tasty Blue Lemonade 500g","Tasty Lemon Ice Tea 500g","Tasty Sagot Gulaman 500g","Cheemag Black Gulaman 500g","Cheemag Black Gulaman 1Kg","Cheemag Red Ice tea 500g","Cheemag Ice Tea 500g","Cheemag Ice Tea 1Kg","Nan Yuan BreadCrumbs 230g","Nan Yuan BreadCrumbs 80g","Ajinomoto Crispy Fry Original 1Kg","Ajinomoto Crispy Fry Original 3-4Kg","Ajinomoto Crispy Fry Garlic 1Kg","Ajinomoto Crispy Fry Spicy 1Kg","Oysterrific Oyster Sauce 70g","Energen Champion Twinpack","Mr Gulaman Yellow","Mr Gulaman Red","Mr Gulaman Green","Mr Gulaman Black","Mr Gulaman Buko Pandan","Glutinous Rice Flour 500g","Mexican Hot Sauce 1G","Mexican Hot Sauce 1L","Red Label Hot Sauce 1G","Rose Vinegar 3.78Liter","Rose Vinegar 385ml","Rose Vinegar 200ml","Didis Peanut Butter 250g","Didis Peanut Butter 500g","Didis Peanut Butter 620g","Ligo Sardines Red 425g","Ligo Sardines Red 155g","Ligo Sardines Green 425g","Ligo Sardines Green 155g","555 Sardines Red 425g","555 Sardines Red 155g","555 Sardines Green 425g","555 Sardines Green 155g","Argentina Meat Loaf 170g","Argentina Cornbeef 175g","Argentina Cornbeef 260g","Argentina Giniling 250g","Century Tuna Spicy 420g","Century Tuna Spicy 155g","Century Tuna Flakes 420g","Century Tuna Flakes 155g","Century Tuna Flakes 180g","Century Tuna Spicy 180g","San Marino Chili 150g","San Marino Chili 80g","San Marino Corned Tuna 150g","San Marino Chili 180g","San Marino Corned Tuna 180g","San Marino Corned Tuna 80g","Maling Luncheon Chicken 397g","Ideal Elbow 200g","Ideal Elbow 5Kg","Ideal Shell 200g","Ideal Shell 5Kg","Ideal Penny 5Kg","Sunmac Superghetti 1.6Kg","Sunmac Spaghetti 400g","Sunmac Spaghetti 800g","Sunshine Sauceyghetti 900g","Tim Barbeque Marinade 80ml","Tim Oyster Sauce 90g","Coco Mama Fresh Gata 200ml","Coco Mama Fresh Gata 400ml","Hansung Luncheon Meat 340g","Hansung Luncheon Meat Chicken 340g","Dongwon Luncheon Meat 340g","Dak Pork Luncheon Meant 340g","Gochujang Hot Red Pepper Paste 170g","Ssamjang Green Soybean Paste 170g","Boneless Bagoong 320ml"],
  "Plastic Supplies": ["King Bee Mini","King Bee Tiny","King Bee Medium","King Bee Large","Spoon","SpoonFork","Fork","8x11 Roll","8x14 Labo","20x30 Rollbag","Styro Spaghetti","Styro Plates","Styro Cup","Styro Bowl","Paper Plate","Paper Cup 6.5oz","Paper Cup 8oz","Paper Cup 320cc","Paper Cup 390cc","Paper Cup 520cc","Plastic Cup 3oz","Plastic Cup 5oz","Plastic Cup 6oz","Plastic Cup 7oz","Plastic Cup 8oz","Plastic Cup 10oz","Plastic Cup 12oz","Plastic Cup 14oz","Plastic Cup 16oz","Triple Hat 4x12","Coolers Softdrinks 4x10","Drinking Straw","All Mighty Dishwashing Red","All Mighty Dishwashing Blue","All Mighty Dishwashing Green","All Mighty Dishwashing Yellow","All Mighty Dishwashing Apple","All Mighty Powder Pink","All Mighty Powder Green","All Mighty Powder Blue","All Mighty Powder Red","Aluminum Foil 8M","Cling Wrap 10M","Butane","BBQ Stick 6inch","BBQ Stick 8inch","BBQ Stick 10inch","BBQ Stick 12inch"]
};

function initItems() {
  const result = {};
  for (const cat of DEFAULT_CATEGORIES) {
    result[cat] = (defaultItems[cat] || []).map(name => ({
      id: Math.random().toString(36).slice(2),
      name,
      marked: false,
      note: "",
      price: defaultPrices[name] || null
    }));
  }
  return result;
}

function loadSavedData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.categories && parsed.items) return parsed;
    return null;
  } catch {
    return null;
  }
}

export default function App() {
  const saved = loadSavedData();
  const [categories, setCategories] = useState(saved ? saved.categories : DEFAULT_CATEGORIES);
  const [activeTab, setActiveTab] = useState(
    saved && saved.categories.includes(saved.activeTab) ? saved.activeTab : (saved ? saved.categories[0] : "Market Items")
  );
  const [items, setItems] = useState(saved ? saved.items : initItems);
  const [newItemName, setNewItemName] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [noteInput, setNoteInput] = useState("");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState("");
  const [showAddCatModal, setShowAddCatModal] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [deleteCatTarget, setDeleteCatTarget] = useState(null);
  const [editingPrice, setEditingPrice] = useState(null);
  const [priceInput, setPriceInput] = useState("");
  const [activeView, setActiveView] = useState("order"); // "order" | "pricelist"

  const noteRef = useRef(null);
  const newCatRef = useRef(null);
  const priceRef = useRef(null);

  const currentItems = items[activeTab] || [];
  const filtered = search
    ? currentItems.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    : currentItems;

  const markedItems = categories.flatMap(cat =>
    (items[cat] || []).filter(i => i.marked).map(i => ({ ...i, category: cat }))
  );

  // Persist to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ categories, items, activeTab }));
    } catch {
      // storage unavailable — ignore
    }
  }, [categories, items, activeTab]);

  function toggleMark(id) {
    setItems(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(i => i.id === id ? { ...i, marked: !i.marked } : i)
    }));
  }

  function addItem() {
    const name = newItemName.trim();
    if (!name) return;
    setItems(prev => ({
      ...prev,
      [activeTab]: [...(prev[activeTab] || []), {
        id: Math.random().toString(36).slice(2),
        name, marked: false, note: "", price: null
      }]
    }));
    setNewItemName("");
  }

  function deleteItem(id) {
    setItems(prev => ({ ...prev, [activeTab]: prev[activeTab].filter(i => i.id !== id) }));
  }

  function openNote(item) {
    setEditingNote(item.id);
    setNoteInput(item.note);
    setTimeout(() => noteRef.current?.focus(), 100);
  }

  function saveNote(id) {
    setItems(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(i => i.id === id ? { ...i, note: noteInput } : i)
    }));
    setEditingNote(null);
  }

  function openPrice(item) {
    setEditingPrice(item.id);
    setPriceInput(item.price !== null ? String(item.price) : "");
    setTimeout(() => priceRef.current?.focus(), 100);
  }

  function savePrice(id) {
    const val = parseFloat(priceInput);
    setItems(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(i =>
        i.id === id ? { ...i, price: isNaN(val) ? null : val } : i
      )
    }));
    setEditingPrice(null);
  }

  function addCategory() {
    const name = newCatName.trim();
    if (!name || categories.includes(name)) return;
    setCategories(prev => [...prev, name]);
    setItems(prev => ({ ...prev, [name]: [] }));
    setActiveTab(name);
    setNewCatName("");
    setShowAddCatModal(false);
  }

  function deleteCategory(cat) {
    const newCats = categories.filter(c => c !== cat);
    setCategories(newCats);
    setItems(prev => { const next = { ...prev }; delete next[cat]; return next; });
    setActiveTab(newCats[0] || "");
    setDeleteCatTarget(null);
  }

  function buildOrderText() {
    const grouped = {};
    for (const item of markedItems) {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    }
    let text = "📋 ORDER LIST\n" + "=".repeat(20) + "\n";
    for (const cat of categories) {
      if (!grouped[cat]) continue;
      text += `\n[${cat.toUpperCase()}]\n`;
      for (const item of grouped[cat]) {
        text += `• ${item.name}`;
        if (item.note) text += ` - ${item.note}`;
        text += "\n";
      }
    }
    return text;
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(buildOrderText()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function clearAllMarks() {
    setItems(prev => {
      const next = {};
      for (const cat of categories) {
        next[cat] = (prev[cat] || []).map(i => ({ ...i, marked: false, note: "" }));
      }
      return next;
    });
  }

  const modalOverlay = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 };
  const modalBox = { background: "#fff", borderRadius: 16, padding: "24px 20px", width: "100%", maxWidth: 360, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f8fa", fontFamily: "'Segoe UI', sans-serif", maxWidth: 480, margin: "0 auto", position: "relative" }}>

      {/* Header */}
      <div style={{ background: "#c0392b", color: "#fff", padding: "18px 16px 12px", position: "sticky", top: 0, zIndex: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 0.5 }}>🛒 EGN STORE</div>
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>
              {activeView === "order" ? `${markedItems.length} item${markedItems.length !== 1 ? "s" : ""} marked` : "Price List"}
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {/* View toggle */}
            <button onClick={() => setActiveView(activeView === "order" ? "pricelist" : "order")} style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "none", borderRadius: 20, padding: "7px 12px", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
              {activeView === "order" ? "₱ Price List" : "📋 Order"}
            </button>
            {activeView === "order" && (
              <button onClick={() => setShowOrderModal(true)} disabled={markedItems.length === 0} style={{ background: markedItems.length > 0 ? "#fff" : "rgba(255,255,255,0.3)", color: markedItems.length > 0 ? "#c0392b" : "#fff", border: "none", borderRadius: 20, padding: "7px 12px", fontWeight: 700, fontSize: 12, cursor: markedItems.length > 0 ? "pointer" : "not-allowed" }}>
                Send 📤
              </button>
            )}
          </div>
        </div>

        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search items..." style={{ width: "100%", marginTop: 10, padding: "8px 12px", borderRadius: 8, border: "none", fontSize: 14, boxSizing: "border-box", outline: "none" }} />

        <div style={{ display: "flex", gap: 6, marginTop: 10, overflowX: "auto", paddingBottom: 2, alignItems: "center" }}>
          {categories.map(cat => {
            const count = (items[cat] || []).filter(i => i.marked).length;
            return (
              <div key={cat} style={{ position: "relative", flexShrink: 0 }}>
                <button onClick={() => { setActiveTab(cat); setSearch(""); }} style={{ whiteSpace: "nowrap", padding: "5px 10px", borderRadius: 14, border: "none", fontSize: 11, fontWeight: 600, cursor: "pointer", background: activeTab === cat ? "#fff" : "rgba(255,255,255,0.2)", color: activeTab === cat ? "#c0392b" : "#fff" }}>
                  {cat}
                  {count > 0 && activeView === "order" && <span style={{ marginLeft: 4, background: "#e74c3c", color: "#fff", borderRadius: 10, padding: "1px 5px", fontSize: 10 }}>{count}</span>}
                </button>
                {!DEFAULT_CATEGORIES.includes(cat) && (
                  <button onClick={() => setDeleteCatTarget(cat)} style={{ position: "absolute", top: -6, right: -6, width: 16, height: 16, borderRadius: "50%", background: "#fff", color: "#c0392b", border: "none", fontSize: 9, fontWeight: 900, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>✕</button>
                )}
              </div>
            );
          })}
          <button onClick={() => { setShowAddCatModal(true); setTimeout(() => newCatRef.current?.focus(), 100); }} style={{ whiteSpace: "nowrap", flexShrink: 0, padding: "5px 10px", borderRadius: 14, border: "2px dashed rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 700, cursor: "pointer", background: "transparent", color: "#fff" }}>
            + Category
          </button>
        </div>
      </div>

      {/* ── ORDER VIEW ── */}
      {activeView === "order" && (
        <div style={{ padding: "10px 12px 100px" }}>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", color: "#aaa", padding: "40px 0", fontSize: 14 }}>
              {currentItems.length === 0 ? "No items yet. Add one below!" : "No items found"}
            </div>
          )}
          {filtered.map(item => (
            <div key={item.id} style={{ background: item.marked ? "#fff5f5" : "#fff", border: item.marked ? "1.5px solid #e74c3c" : "1.5px solid #eee", borderRadius: 10, marginBottom: 8, padding: "10px 12px", display: "flex", alignItems: "flex-start", gap: 10, transition: "all 0.15s" }}>
              <button onClick={() => toggleMark(item.id)} style={{ width: 28, height: 28, borderRadius: "50%", border: item.marked ? "none" : "2px solid #ccc", background: item.marked ? "#e74c3c" : "transparent", color: "#fff", fontSize: 14, cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                {item.marked ? "✓" : ""}
              </button>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: item.marked ? 600 : 400, color: item.marked ? "#c0392b" : "#222" }}>{item.name}</div>
                  {item.price !== null && (
                    <div style={{ fontSize: 12, color: "#27ae60", fontWeight: 600, marginLeft: 8, whiteSpace: "nowrap" }}>₱{item.price.toLocaleString()}</div>
                  )}
                </div>
                {editingNote === item.id ? (
                  <div style={{ marginTop: 6, display: "flex", gap: 6 }}>
                    <input ref={noteRef} value={noteInput} onChange={e => setNoteInput(e.target.value)} onKeyDown={e => e.key === "Enter" && saveNote(item.id)} placeholder="e.g. 5kls, 1box lang..." style={{ flex: 1, padding: "5px 8px", borderRadius: 6, border: "1px solid #e74c3c", fontSize: 12, outline: "none" }} />
                    <button onClick={() => saveNote(item.id)} style={{ background: "#e74c3c", color: "#fff", border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 12, cursor: "pointer" }}>Save</button>
                    <button onClick={() => setEditingNote(null)} style={{ background: "#eee", color: "#555", border: "none", borderRadius: 6, padding: "5px 8px", fontSize: 12, cursor: "pointer" }}>✕</button>
                  </div>
                ) : item.note ? (
                  <div onClick={() => openNote(item)} style={{ marginTop: 3, fontSize: 12, color: "#e74c3c", fontStyle: "italic", cursor: "pointer" }}>📝 {item.note}</div>
                ) : null}
              </div>
              <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                <button onClick={() => openNote(item)} style={{ background: "none", border: "1px solid #ddd", borderRadius: 6, padding: "4px 7px", fontSize: 13, cursor: "pointer", color: "#888" }}>📝</button>
                <button onClick={() => deleteItem(item.id)} style={{ background: "none", border: "1px solid #ddd", borderRadius: 6, padding: "4px 7px", fontSize: 13, cursor: "pointer", color: "#ccc" }}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── PRICE LIST VIEW ── */}
      {activeView === "pricelist" && (
        <div style={{ padding: "10px 12px 100px" }}>
          <div style={{ background: "#fff", borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 12, color: "#888", border: "1px solid #eee" }}>
            💡 Tap <strong>₱ —</strong> to set a price. Prices are for reference only and won't appear in your order.
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", color: "#aaa", padding: "40px 0", fontSize: 14 }}>
              {currentItems.length === 0 ? "No items yet." : "No items found"}
            </div>
          )}
          {filtered.map(item => (
            <div key={item.id} style={{ background: "#fff", border: "1.5px solid #eee", borderRadius: 10, marginBottom: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, color: "#222" }}>{item.name}</div>
              </div>

              {editingPrice === item.id ? (
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: "#27ae60", fontWeight: 700 }}>₱</span>
                  <input
                    ref={priceRef}
                    value={priceInput}
                    onChange={e => setPriceInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && savePrice(item.id)}
                    placeholder="0.00"
                    type="number"
                    style={{ width: 80, padding: "5px 8px", borderRadius: 6, border: "1px solid #27ae60", fontSize: 13, outline: "none", textAlign: "right" }}
                  />
                  <button onClick={() => savePrice(item.id)} style={{ background: "#27ae60", color: "#fff", border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 12, cursor: "pointer" }}>✓</button>
                  <button onClick={() => setEditingPrice(null)} style={{ background: "#eee", color: "#555", border: "none", borderRadius: 6, padding: "5px 8px", fontSize: 12, cursor: "pointer" }}>✕</button>
                </div>
              ) : (
                <button onClick={() => openPrice(item)} style={{ display: "flex", alignItems: "center", gap: 6, background: item.price !== null ? "#f0faf4" : "#f7f8fa", border: item.price !== null ? "1.5px solid #27ae60" : "1.5px dashed #ccc", borderRadius: 8, padding: "6px 12px", cursor: "pointer", minWidth: 80, justifyContent: "flex-end" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: item.price !== null ? "#27ae60" : "#bbb" }}>
                    {item.price !== null ? `₱${item.price.toLocaleString()}` : "₱ —"}
                  </span>
                  <span style={{ fontSize: 10, color: "#aaa" }}>✏️</span>
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Item Bar */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "#fff", borderTop: "1px solid #eee", padding: "10px 12px", display: "flex", gap: 8, boxSizing: "border-box", zIndex: 10 }}>
        <input value={newItemName} onChange={e => setNewItemName(e.target.value)} onKeyDown={e => e.key === "Enter" && addItem()} placeholder={`Add item to ${activeTab}...`} style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: "1.5px solid #ddd", fontSize: 14, outline: "none" }} />
        <button onClick={addItem} style={{ background: "#c0392b", color: "#fff", border: "none", borderRadius: 8, padding: "10px 16px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>+ Add</button>
      </div>

      {/* Add Category Modal */}
      {showAddCatModal && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14, color: "#c0392b" }}>➕ New Category</div>
            <input ref={newCatRef} value={newCatName} onChange={e => setNewCatName(e.target.value)} onKeyDown={e => e.key === "Enter" && addCategory()} placeholder="e.g. Beverages..." style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1.5px solid #ddd", fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 14 }} />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={addCategory} style={{ flex: 1, background: "#c0392b", color: "#fff", border: "none", borderRadius: 8, padding: "11px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Add</button>
              <button onClick={() => { setShowAddCatModal(false); setNewCatName(""); }} style={{ flex: 1, background: "#f0f0f0", color: "#555", border: "none", borderRadius: 8, padding: "11px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Category Modal */}
      {deleteCatTarget && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: "#c0392b" }}>🗑 Delete Category?</div>
            <div style={{ fontSize: 14, color: "#555", marginBottom: 20 }}>Delete <strong>"{deleteCatTarget}"</strong> and all its items?</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => deleteCategory(deleteCatTarget)} style={{ flex: 1, background: "#e74c3c", color: "#fff", border: "none", borderRadius: 8, padding: "11px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Delete</button>
              <button onClick={() => setDeleteCatTarget(null)} style={{ flex: 1, background: "#f0f0f0", color: "#555", border: "none", borderRadius: 8, padding: "11px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Order Modal */}
      {showOrderModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: "20px 20px 0 0", padding: "20px 16px 32px", width: "100%", maxWidth: 480, maxHeight: "80vh", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#c0392b" }}>📋 Your Order</div>
              <button onClick={() => setShowOrderModal(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#aaa" }}>✕</button>
            </div>
            <pre style={{ flex: 1, overflowY: "auto", background: "#f7f8fa", borderRadius: 10, padding: 14, fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word", color: "#222", marginBottom: 14 }}>
              {buildOrderText()}
            </pre>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button onClick={copyToClipboard} style={{ background: "#c0392b", color: "#fff", border: "none", borderRadius: 10, padding: "13px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                {copied ? "✅ Copied!" : "📋 Copy for SMS / Messenger"}
              </button>
              <button onClick={() => { if (confirm("Clear all marks and notes?")) { clearAllMarks(); setShowOrderModal(false); } }} style={{ background: "#fff", color: "#e74c3c", border: "1.5px solid #e74c3c", borderRadius: 10, padding: "11px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                🗑 Clear All Marks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
