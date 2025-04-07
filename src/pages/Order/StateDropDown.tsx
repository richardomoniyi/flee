import React from "react";

// Define states/provinces for different countries
const statesByCountry: Record<string, string[]> = {
  Nigeria: [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
    "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT",
    "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
    "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers",
    "Sokoto", "Taraba", "Yobe", "Zamfara"
  ],
  USA: [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas",
    "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas",
    "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ],
  Canada: [
    "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
    "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan"
  ],
  UK: [
    "England", "Scotland", "Wales", "Northern Ireland"
  ],

  France: [
    "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Brittany", "Centre-Val de Loire",
    "Corsica", "Grand Est", "Hauts-de-France", "Île-de-France", "Normandy", "Nouvelle-Aquitaine",
    "Occitanie", "Pays de la Loire", "Provence-Alpes-Côte d'Azur"
  ],
  Germany: [
    "Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hesse",
    "Lower Saxony", "Mecklenburg-Vorpommern", "North Rhine-Westphalia", "Rhineland-Palatinate",
    "Saarland", "Saxony", "Saxony-Anhalt", "Schleswig-Holstein", "Thuringia"
  ],
  Australia: [
    "Australian Capital Territory", "New South Wales", "Northern Territory", "Queensland",
    "South Australia", "Tasmania", "Victoria", "Western Australia"
  ],
  India: [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli",
    "Daman and Diu", "Lakshadweep", "Delhi", "Puducherry", "Jammu and Kashmir", "Ladakh"
  ],
  SouthAfrica: [
    "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga",
    "North West", "Northern Cape", "Western Cape"
  ],
 "Brazil": [
  "Acre", "Alagoas", "Amapá", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás",
  "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná",
  "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul",
  "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
],
  Mexico: [
    "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas",
    "Chihuahua", "Coahuila", "Colima", "Durango", "Guanajuato", "Guerrero", "Hidalgo",
    "Jalisco", "Mexico State", "Michoacán", "Morelos", "Nayarit", "Nuevo León",
    "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa",
    "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
  ],
  Japan: [
    "Aichi", "Akita", "Aomori", "Chiba", "Ehime", "Fukui", "Fukuoka", "Fukushima", "Gifu",
    "Gunma", "Hiroshima", "Hokkaido", "Hyogo", "Ibaraki", "Ishikawa", "Iwate", "Kagawa",
    "Kagoshima", "Kanagawa", "Kochi", "Kumamoto", "Kyoto", "Mie", "Miyagi", "Miyazaki",
    "Nagano", "Nagasaki", "Nara", "Niigata", "Oita", "Okayama", "Okinawa", "Osaka", "Saga",
    "Saitama", "Shiga", "Shimane", "Shizuoka", "Tochigi", "Tokushima", "Tokyo", "Tottori",
    "Toyama", "Wakayama", "Yamagata", "Yamaguchi", "Yamanashi"
  ],    
  China: [
    "Anhui", "Beijing", "Chongqing", "Fujian", "Gansu", "Guangdong", "Guangxi", "Guizhou",
    "Hainan", "Hebei", "Heilongjiang", "Henan", "Hubei", "Hunan", "Inner Mongolia", "Jiangsu",
    "Jiangxi", "Jilin", "Liaoning", "Ningxia", "Qinghai", "Shaanxi", "Shandong", "Shanghai",
    "Shanxi", "Sichuan", "Tianjin", "Tibet", "Xinjiang", "Yunnan", "Zhejiang"
  ],
  Italy: [
    "Abruzzo", "Aosta Valley", "Apulia", "Basilicata", "Calabria", "Campania", "Emilia-Romagna",
    "Friuli Venezia Giulia", "Lazio", "Liguria", "Lombardy", "Marche", "Molise", "Piedmont",
    "Sardinia", "Sicily", "Tuscany", "Trentino-Alto Adige/Südtirol", "Umbria", "Veneto"
  ],
  Spain: [
    "Andalusia", "Aragon", "Asturias", "Balearic Islands", "Basque Country", "Canary Islands",
    "Cantabria", "Castile and León", "Castilla-La Mancha", "Catalonia", "Extremadura",
    "Galicia", "La Rioja", "Madrid", "Murcia", "Navarre", "Valencian Community"
  ],
  Russia: [
    "Adygea", "Altai Krai", "Altai Republic", "Amur Oblast", "Arkhangelsk Oblast",
    "Astrakhan Oblast", "Bashkortostan", "Buryatia", "Chechen Republic", "Chelyabinsk Oblast",
    "Chukotka Autonomous Okrug", "Chuvash Republic", "Dagestan", "Ingushetia", "Irkutsk Oblast",
    "Ivanovo Oblast", "Jewish Autonomous Oblast", "Kabardino-Balkar Republic", "Kaliningrad Oblast",
    "Kalmykia", "Kaluga Oblast", "Kamchatka Krai", "Karachay-Cherkess Republic", "Karelia",
    "Kemerovo Oblast", "Khabarovsk Krai", "Khakassia", "Khanty-Mansi Autonomous Okrug",
    "Kirov Oblast", "Komi Republic", "Kostroma Oblast", "Krasnodar Krai", "Krasnoyarsk Krai",
    "Kurgan Oblast", "Kursk Oblast", "Leningrad Oblast", "Lipetsk Oblast", "Magadan Oblast",
    "Mari El Republic", "Mordovia", "Moscow", "Moscow Oblast", "Murmansk Oblast",
    "Nizhny Novgorod Oblast", "North Ossetia-Alania", "Novgorod Oblast", "Novosibirsk Oblast",
    "Omsk Oblast", "Orenburg Oblast", "Oryol Oblast", "Penza Oblast", "Perm Krai",
    "Primorsky Krai", "Pskov Oblast", "Rostov Oblast", "Ryazan Oblast", "Saint Petersburg",
    "Sakha Republic", "Sakhalin Oblast", "Samara Oblast", "Saratov Oblast", "Smolensk Oblast",
    "Stavropol Krai", "Sverdlovsk Oblast", "Tambov Oblast", "Tatarstan", "Tomsk Oblast",
    "Tula Oblast", "Tver Oblast", "Tyumen Oblast", "Udmurt Republic", "Ulyanovsk Oblast",
    "Vladimir Oblast", "Volgograd Oblast", "Vologda Oblast", "Voronezh Oblast",
    "Yamalo-Nenets Autonomous Okrug", "Yaroslavl Oblast", "Zabaykalsky Krai"
  ],
  SouthKorea: [
    "Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju", "Suwon", "Ulsan",
    "Gyeonggi", "Gangwon", "North Chungcheong", "South Chungcheong", "North Jeolla",
    "South Jeolla", "North Gyeongsang", "South Gyeongsang", "Jeju"
  ],
  Turkey: [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara",
    "Antalya", "Ardahan", "Artvin", "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt",
    "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı",
    "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan",
    "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay",
    "Iğdır", "Isparta", "İstanbul", "İzmir", "Kahramanmaraş", "Karabük", "Kars",
    "Kastamonu", "Kayseri", "Kırıkkale", "Kırklareli", "Kırşehir", "Konya", "Kütahya",
    "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir", "Niğde",
    "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas",
    "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van",
    "Yalova", "Yozgat", "Zonguldak"
  ],
  UAE: [
    "Abu Dhabi", "Ajman", "Dubai", "Fujairah", "Ras Al Khaimah", "Sharjah", "Umm Al-Quwain"
  ],
  SaudiArabia: [
    "Abha", "Al Ahsa", "Al Bahah", "Al Jawf", "Al Madinah", "Al Qassim", "Al Riyadh",
    "Al Sharqiyah", "Asir", "Baha", "Hail", "Jazan", "Jeddah", "Makkah", "Najran",
    "Northern Borders", "Qassim", "Riyadh", "Tabuk", "Tayma", "Yanbu"
  ],
  Egypt: [
    "Alexandria", "Aswan", "Asyut", "Beheira", "Beni Suef", "Cairo", "Dakahlia",
    "Damietta", "Faiyum", "Gharbia", "Giza", "Ismailia", "Kafr El Sheikh", "Luxor",
    "Matrouh", "Minya", "Monufia", "New Valley", "North Sinai", "Port Said",
    "Qalyubia", "Qena", "Red Sea", "Sharqia", "Sohag", "South Sinai", "Suez"
  ],             

};

interface StateDropdownProps {
  name: string;
  country: string; // The selected country
  value: string; // Controlled value for the state
  onChange: (state: string) => void; // Function to update the selected state
}

const StateDropDown: React.FC<StateDropdownProps> = ({ name, country, value, onChange }) => {
  // Get the states based on the selected country, or an empty array if country is not found
  const states = statesByCountry[country] || [];

  return (
    <div>
      <label htmlFor={name}>State/Province:</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border p-2 rounded"
        disabled={states.length === 0} // Disable dropdown if no states available
      >
        <option value="">-- State/Province --</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StateDropDown;
