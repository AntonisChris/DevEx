public with sharing class KeySalesMetricsController {
  public String test { get; set; }
  public Integer numberofleads { get; set; }
  public Integer numberofqualifiedLeads { get; set; }
  public Integer numberofopps { get; set; }
  public Decimal valueofwonOpps { get; set; }

  public KeySalesMetricsController() {
    List<Lead> leads = [SELECT Id, Name, Status FROM Lead];
    List<Opportunity> opps = [
      SELECT Id, Name, StageName, Amount
      FROM Opportunity
    ];

    numberofleads = leads.size();
    numberofopps = opps.size();

    List<Lead> qualifiedLeads = new List<Lead>();
    for (Lead l : leads) {
      if (l.Status == 'Qualified') {
        qualifiedLeads.add(l);
      }
    }
    numberofqualifiedLeads = qualifiedLeads.size();

    valueofwonOpps = 0;
    for (Opportunity o : opps) {
      if (o.StageName == 'Closed Won') {
        valueofwonOpps += o.Amount;
      }
    }

    test = 'this is the real test';
  }
}
