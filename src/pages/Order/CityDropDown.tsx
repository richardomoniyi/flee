import React, { useState } from "react";

const citiesByState: { [key: string]: string[] } = {
  Lagos: ["Ikeja", "Surulere", "Lekki", "Yaba", "Victoria Island", "Badagry", "Ajah", "Epe", "Ikorodu", "Mushin", "Shomolu", "Amuwo-Odofin", "Lagos Island"],
  Ogun: ["Abeokuta", "Ijebu-Ode", "Sagamu", "Sango-Ota", "Ota", "Ifo", "Ogun Waterside", "Yewa North", "Ado-Odo/Ota", "Ijebu North", "Ijebu East"],
  Abia: ["Umuahia", "Aba", "Ohafia", "Arochukwu", "Ugwunagbo", "Isiala Ngwa", "Bende", "Ikwuano"],
  Kaduna: ["Kaduna", "Zaria", "Kafanchan", "Makarfi", "Kachia", "Soba", "Lere", "Jemaa", "Igabi", "Kudan"],
  Kano: ["Kano", "Wudil", "Karaye", "Rano", "Bichi", "Gaya", "Dawakin Kudu", "Dawakin Tofa", "Kumbotso", "Fagge", "Nasarawa", "Tarauni"],
  Oyo: ["Ibadan", "Oyo", "Ogbomosho", "Saki", "Iseyin", "Ibarapa", "Eruwa", "Kishi", "Shaki", "Akinyele"],
  Rivers: ["Port Harcourt", "Bonny", "Ahoada", "Opobo", "Isiokpo", "Omoku", "Bori", "Bodo", "Rumuokoro", "Rumuomoi", "Eleme"],
  Anambra: ["Awka", "Onitsha", "Nnewi", "Umuocha", "Okigwe", "Ihiala", "Idemili", "Amesi", "Ogidi", "Agulu"],
  Enugu: ["Enugu", "Nsukka", "Udi", "Oji River", "Enugu East", "Enugu North", "Enugu South", "Igboeze North", "Igboeze South", "Aninri"],
  Delta: ["Asaba", "Warri", "Sapele", "Ughelli", "Agbor", "Kwale", "Effurun", "Ozoro", "Ughelli North", "Udu", "Isoko"],
  Edo: ["Benin City", "Ekpoma", "Auchi", "Igarra", "Uromi", "Agbede", "Ubiaja", "Oredo", "Orhionmwon", "Egor"],
  Imo: ["Owerri", "Orlu", "Okigwe", "Mbaitoli", "Njaba", "Isu", "Ngor-Okpala", "Oguta", "Ideato"],
  Bauchi: ["Bauchi", "Azare", "Jama'are", "Misau", "Ningi", "Shira", "Tafawa Balewa", "Kirfi", "Gamawa"],
  Katsina: ["Katsina", "Daura", "Funtua", "Malumfashi", "Kankara", "Zango", "Batagarawa", "Kusada", "Ingawa", "Jibia"],
  Sokoto: ["Sokoto", "Tambuwal", "Shagari", "Gada", "Bodinga", "Wamako", "Sokoto South", "Sokoto North", "Kware"],
  Plateau: ["Jos", "Shendam", "Pankshin", "Barkin Ladi", "Langtang", "Mangu", "Bokkos", "Kanam", "Wase", "Qua'an Pan"],
  Ekiti: ["Ado-Ekiti", "Ikere-Ekiti", "Ijero-Ekiti", "Ise-Ekiti", "Oye-Ekiti", "Emure-Ekiti", "Efon-Alaaye"],
  Kwara: ["Ilorin", "Omu-Aran", "Offa", "Ajase-Ipo", "Shagamu", "Ilorin East", "Ilorin West", "Moro", "Irepodun"],
  Adamawa: ["Yola", "Mubi", "Niger", "Jimeta", "Ganye", "Girei", "Lamurde", "Shelleng", "Song"],
  Bayelsa: ["Yenagoa", "Brass", "Sagbama", "Ekeremor", "Kolokuma-Opokuma", "Nembe", "Ogbia", "Southern Ijaw"],
  "Cross River": ["Calabar", "Ogoja", "Ikom", "Obudu", "Bekwarra", "Boki", "Yala", "Akpabuyo", "Obubra", "Etung"],
  Kebbi: ["Birnin Kebbi", "Argungu", "Jega", "Gwandu", "Zuru", "Sakaba", "Koko", "Dandi", "Wasagu"],
  Niger: ["Minna", "Kontagora", "Suleja", "Bida", "Kuta", "Lapai", "New Bussa", "Shiroro", "Rafi"],
  Taraba: ["Jalingo", "Wukari", "Keffi", "Ibi", "Donga", "Sunkani", "Gembu", "Zing"],
  Yobe: ["Damaturu", "Potiskum", "Bade", "Nguru", "Gashua", "Gulani", "Fika", "Machina", "Jakusko"],
  Borno: ["Maiduguri", "Biu", "Monguno", "Dikwa", "Gamboru", "Gwoza", "Kaga", "Konduga", "Jere", "Bama"],
  Ondo: ["Akure", "Ondo", "Owo", "Ikare", "Ile-Oluji", "Ikare-Akoko", "Oka-Akoko", "Odigbo", "Apoi", "Ifon"],
  Ebonyi: ["Abakaliki", "Afikpo", "Ishielu", "Ebonyi", "Ikwo", "Ezza", "Ohaukwu", "Izzi", "Ohaozara"],
  Kogi: ["Lokoja", "Okene", "Idah", "Ogori", "Ajao", "Adavi", "Okehi", "Ibaji", "Kabba", "Mopa"],
  Nasarawa: ["Lafia", "Akwanga", "Keffi", "Doma", "Nasarawa", "Karu", "Keana", "Obi", "Toto", "Kokona"]
};

  interface CityDropdownProps {
    selectedState: string;
    name:string;
    value: string; // Controlled value
    onChange: (city: string) => void; // Function to update form city
  }
  
  const CityDropDown: React.FC<CityDropdownProps> = ({ selectedState, name,value, onChange }) => {
    const cities = citiesByState[selectedState] || [];
  
    return (
      <div>
        <label htmlFor="city">City:</label>
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">-- Select City --</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
          <option value="Others">Others</option>
        </select>
      </div>
    );
  };
  export default CityDropDown;
  