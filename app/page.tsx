"use client";
import data from "../data.json";
import { CountryData } from "@/types";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const countryData: CountryData[] = JSON.parse(
    JSON.stringify(data)
  ) as CountryData[];

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedRegion, setSelectedRegion] = useState("");

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
  };

  const filteredCountries = countryData.filter((data) => {
    const matchesSearchTerm = data.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion =
      selectedRegion === "" || data.region === selectedRegion;
    return matchesSearchTerm && matchesRegion;
  });

  return (
    <>
      <div className="flex w-4/5 mx-auto justify-between mt-[2rem]">
        <input
          type="text"
          className="text-sm placeholder:font-norma focus:outline-none focus:ring-1 focus:ring-violet-200 py-3 px-4 rounded-md border border-gray-300 w-2/5 mb-4"
          placeholder="Search for a country"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="appearance-none text-sm focus:outline-none w-[160px] h-[40px] px-4 rounded-md border border-gray-300"
          onChange={(e) => handleRegionChange(e.target.value)}
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-x-8  w-4/5 mx-auto ">
        {filteredCountries.map((data) => (
          <div
            key={data.name}
            className="mx-auto mt-[5rem] rounded-md  shadow-md "
          >
            <div className="w-[250px] h-[150px] ">
              <Image
                className="object-cover w-[100%] h-[100%]"
                src={data.flags.svg}
                alt={data.name}
                width={1}
                height={1}
              />
            </div>
            <div className="px-8 py-4  overflow-hidden ">
              <h2 className="text-[1rem] w-4/5 font-medium whitespace-normal ">
                {data.name}
              </h2>{" "}
              <p className="mt-4 text-sm tracking-wide">
                Population:{" "}
                <span className="text-slate-700">{data.population}</span>{" "}
              </p>{" "}
              <p className="text-sm tracking-wide mt-1">
                Region: <span className="text-slate-700">{data.region}</span>{" "}
              </p>{" "}
              <p className="text-sm tracking-wide mt-1 pb-2">
                Capital: <span className="text-slate-700">{data.capital}</span>{" "}
              </p>{" "}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
