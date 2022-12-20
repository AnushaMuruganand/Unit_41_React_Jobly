import React, { useState, useEffect } from "react";

import JoblyApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import SearchForm from "../common/SearchForm";
import JobCardList from "./JobCardList";

/** Show page with list of jobs.
 *
 * On mount, loads jobs from API.
 * Re-loads filtered jobs on submit from search form.
 *
 * JobList -> JobCardList -> JobCard
 *
 * This is routed to at /jobs
 */
function JobList() {

    const [jobs, setJobs] = useState(null);

    useEffect(() => {
        console.debug("JobList useEffect getAllJobsOnMount");
        search();
    }, []);
    
    async function search(searchTerm){
        const jobsList = await JoblyApi.getAllJobs(searchTerm);
        setJobs(jobsList);
    }

    if(!jobs) return <LoadingSpinner/>

    return (
        <div className="JobList col-md-8 offset-md-2">
            <SearchForm searchFor={search} />
            {jobs.length
                ? <JobCardList jobs={jobs} />
                : <p className="lead">Sorry, no results were found!</p>
            }
        </div>
    );
}

export default JobList;