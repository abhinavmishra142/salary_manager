// app/javascript/services/api.js
import axios from "axios";

export const getCountryInsights = (country) =>
  axios.get(`/insights/country?country=${country}`);

export const getJobInsights = (country, jobTitle) =>
  axios.get(`/insights/job?country=${country}&job_title=${jobTitle}`);
