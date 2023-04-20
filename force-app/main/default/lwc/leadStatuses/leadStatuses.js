import { LightningElement, wire } from "lwc";
import getAllLeadsAndStatuses from "@salesforce/apex/leadStatusesController.getAllLeadsAndStatuses";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class LeadStatuses extends LightningElement {
  leads;
  allleads;
  timer;

  columns = [
    { label: "Name", fieldName: "Name" },
    { label: "Status", fieldName: "Status" }
  ];

  @wire(getAllLeadsAndStatuses)
  handleLeads({ error, data }) {
    if (data) {
      this.leads = data.map((lead) => ({
        Id: lead.Id,
        Name: lead.Name,
        Status: lead.Lead_Statuses__r[0].Status__c
      }));
      this.allleads = [...this.leads];
      console.log(data);
    } else if (error) {
      console.log(error);
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Error loading Leads",
          message: error.body.message,
          variant: "error"
        })
      );
    }
  }

  handleSearchChange(event) {
    this.debounceSearch(event.target.value);
  }

  handleSearch = (searchKey) => {
    this.leads = this.allleads.filter((lead) => {
      return lead.Name.toLowerCase().includes(searchKey.toLowerCase());
    });
  };

  debounceSearch(searchKey, delay = 500) {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => this.handleSearch(searchKey), delay);
  }
}
