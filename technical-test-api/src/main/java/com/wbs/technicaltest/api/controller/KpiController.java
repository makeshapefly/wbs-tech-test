package com.wbs.technicaltest.api.controller;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.wbs.technicaltest.api.model.KPI;

import com.wbs.technicaltest.api.repository.KpiRepository;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class KpiController {
	private static final Logger LOG = LoggerFactory.getLogger(KpiController.class);
	String[] dates = {"2023-06-19", "2023-06-20", "2023-06-21", "2023-06-23", "2023-06-24", "2023-06-25"};

	@Autowired
	private KpiRepository kpiRepository;

	@GetMapping(path = {"/date", "/date/{date}"}, produces = "application/json")
	@CrossOrigin
	public ResponseEntity getForDate(@PathVariable("date") String date) {
		try {
			KPI kpi = kpiRepository.findByDay(date);
			final HttpHeaders httpHeaders= new HttpHeaders();
			httpHeaders.setContentType(MediaType.APPLICATION_JSON);
			return new ResponseEntity<String>(kpi.getKpi(), httpHeaders, HttpStatus.OK);

		} catch (Exception ex) {
			LOG.debug(ex.getMessage());
		}
			final HttpHeaders httpHeaders= new HttpHeaders();
			httpHeaders.setContentType(MediaType.APPLICATION_JSON);
			return new ResponseEntity<String>(httpHeaders, HttpStatus.NOT_FOUND);
	}

	@GetMapping(path = {"/team/{team}"}, produces = "application/json")
	@CrossOrigin
	public ResponseEntity getForDateAndTeam(@PathVariable("team") int team) {
		List<String> wacc = new ArrayList<>(),
				factoryUtilization = new ArrayList<>(),
				scores = new ArrayList<>(),
				employeeEngagement = new ArrayList<>(),
				interestCoverage = new ArrayList<>(),
				marketingSpendRev = new ArrayList<>(),
				eCarsSales = new ArrayList<>(),
				co2Penalty = new ArrayList<>();

		String jsonString = ""; //return value

		for (String date: dates) {
			KPI kpi = kpiRepository.findByDay(date);
			ObjectMapper mapper = new ObjectMapper();
			JsonFactory factory = mapper.getJsonFactory();
			try
			{
				JsonParser parser = factory.createJsonParser(kpi.getKpi());
				JsonNode kpis = mapper.readTree(parser);
				Iterator<String> iterator = kpis.fieldNames();
				iterator.forEachRemaining(e -> {
					JsonNode node = kpis.get(e);
					Iterator<JsonNode> kpiIterator = node.iterator();
					kpiIterator.forEachRemaining(value -> {
						if (value.get("team").asInt() == team ) {
							switch (e) {
								case "wacc":
									wacc.add(value.get("value").textValue());
									break;
								case "factory_utilization":
									factoryUtilization.add(value.get("value").textValue());
									break;
								case "scores":
									scores.add(value.get("value").textValue());
									break;
								case "employee_engagement":
									employeeEngagement.add(value.get("value").textValue());
									break;
								case "interest_coverage":
									interestCoverage.add(value.get("value").textValue());
									break;
								case "marketing_spend_rev":
									marketingSpendRev.add(value.get("value").textValue());
									break;
								case "e_cars_sales":
									eCarsSales.add(value.get("value").textValue());
									break;
								case "co2_penalty":
									co2Penalty.add(value.get("value").textValue());
									break;
							}
						}
					});
				});
			}
			catch(Exception e)
			{
				System.out.println("Error: "+e.toString());
			}
		}

		//create return node
		try {
			ObjectMapper createJsonMapper = new ObjectMapper();
			ObjectNode rootNode = createJsonMapper.createObjectNode();
			rootNode.set("wacc", createJsonMapper.valueToTree(wacc));
			rootNode.set("factory_utilization", createJsonMapper.valueToTree(factoryUtilization));
			rootNode.set("scores", createJsonMapper.valueToTree(scores));
			rootNode.set("employee_engagement", createJsonMapper.valueToTree(employeeEngagement));
			rootNode.set("interest_coverage", createJsonMapper.valueToTree(interestCoverage));
			rootNode.set("marketing_spend_rev", createJsonMapper.valueToTree(marketingSpendRev));
			rootNode.set("e_cars_sales", createJsonMapper.valueToTree(eCarsSales));
			rootNode.set("co2_penalty", createJsonMapper.valueToTree(co2Penalty));

			jsonString = createJsonMapper.writerWithDefaultPrettyPrinter().writeValueAsString(rootNode);
		} catch (Exception ex) {
			ex.printStackTrace();
		}

		try {
			final HttpHeaders httpHeaders= new HttpHeaders();
			httpHeaders.setContentType(MediaType.APPLICATION_JSON);
			return new ResponseEntity<String>(jsonString, httpHeaders, HttpStatus.OK);

		} catch (Exception ex) {
			LOG.debug(ex.getMessage());
		}
		final HttpHeaders httpHeaders= new HttpHeaders();
		httpHeaders.setContentType(MediaType.APPLICATION_JSON);
		return new ResponseEntity<String>(httpHeaders, HttpStatus.NOT_FOUND);
	}

	@GetMapping(path = {"/rank/{team}"}, produces = "application/json")
	@CrossOrigin
	public ResponseEntity getRankForWeekForTeam(@PathVariable("team") int team) {

		List<Integer> waccRanksForTeam = new ArrayList<>(),
				factoryUtilisationRanksForTeam = new ArrayList<>(),
				scoresRanksForTeam = new ArrayList<>(),
				employeeEngagementRanksForTeam = new ArrayList<>(),
				interestCoverageRanksForTeam = new ArrayList<>(),
				marketingSpendRanksForTeam = new ArrayList<>(),
				eCarRanksForTeam = new ArrayList<>(),
				co2RanksForTeam = new ArrayList<>();

		for (String date: dates) {
			//create sets to store the values for each KPI per day so that we can sort values
			Set<Double> wacc = new TreeSet<>(),
					factoryUtilization = new TreeSet<>(),
					scores = new TreeSet<>(),
					employeeEngagement = new TreeSet<>(),
					interestCoverage = new TreeSet<>(),
					marketingSpendRev = new TreeSet<>(),
					eCarsSales = new TreeSet<>(),
					co2Penalty = new TreeSet<>();

			var wrapper = new Object(){ double waccValue, factoryUtilisationValue = 0.0, scoresValue = 0.0, employeeEngagementValue = 0.0, interestCovValue = 0.0, markSpendValue = 0.0, eCarValue = 0.0, co2Value = 0.0;
			};

			KPI kpi = kpiRepository.findByDay(date);
			ObjectMapper mapper = new ObjectMapper();
			JsonFactory factory = mapper.getJsonFactory();
			try
			{
				JsonParser parser = factory.createJsonParser(kpi.getKpi());
				JsonNode kpis = mapper.readTree(parser);
				Iterator<String> iterator = kpis.fieldNames();

				iterator.forEachRemaining(e -> {
					JsonNode node = kpis.get(e);
					Iterator<JsonNode> kpiIterator = node.iterator();
					kpiIterator.forEachRemaining(value -> {
						switch (e) {
							case "wacc":
								wacc.add(Double.parseDouble(value.get("value").textValue()));
								if (value.get("team").asInt() == team ) {
									wrapper.waccValue = Double.parseDouble(value.get("value").textValue());
								}
								break;
							case "factory_utilization":
								factoryUtilization.add(Double.parseDouble(value.get("value").textValue()));
								if (value.get("team").asInt() == team ) {
									wrapper.factoryUtilisationValue = Double.parseDouble(value.get("value").textValue());
								}
								break;
							case "scores":
								scores.add(Double.parseDouble(value.get("value").textValue()));
								//System.out.println("Adding: " + Double.parseDouble(value.get("value").textValue()));
								if (value.get("team").asInt() == team ) {
									//System.out.println("team value is: " + Double.parseDouble(value.get("value").textValue()));
									wrapper.scoresValue = Double.parseDouble(value.get("value").textValue());
								}
								break;
							case "employee_engagement":
								employeeEngagement.add(Double.parseDouble(value.get("value").textValue()));
								if (value.get("team").asInt() == team ) {
									wrapper.employeeEngagementValue = Double.parseDouble(value.get("value").textValue());
								}
								break;
							case "interest_coverage":
								interestCoverage.add(Double.parseDouble(value.get("value").textValue()));
								if (value.get("team").asInt() == team ) {
									wrapper.interestCovValue = Double.parseDouble(value.get("value").textValue());
								}
								break;
							case "marketing_spend_rev":
								marketingSpendRev.add(Double.parseDouble(value.get("value").textValue()));
								if (value.get("team").asInt() == team ) {
									wrapper.markSpendValue = Double.parseDouble(value.get("value").textValue());
								}
								break;
							case "e_cars_sales":
								eCarsSales.add(Double.parseDouble(value.get("value").textValue()));
								if (value.get("team").asInt() == team ) {
									wrapper.eCarValue = Double.parseDouble(value.get("value").textValue());
								}
								break;
							case "co2_penalty":
								co2Penalty.add(Double.parseDouble(value.get("value").textValue()));
								if (value.get("team").asInt() == team ) {
									wrapper.co2Value = Double.parseDouble(value.get("value").textValue());
								}
								break;
						}
					});
				});
				} catch (Exception ex) {
			}
			//get ranking for Team {team}
			factoryUtilisationRanksForTeam.add(getIndexUsingIterator(((TreeSet<Double>)factoryUtilization).descendingSet(), wrapper.factoryUtilisationValue) + 1);
			waccRanksForTeam.add(getIndexUsingIterator(((TreeSet<Double>)wacc).descendingSet(), wrapper.waccValue) + 1);
			scoresRanksForTeam.add(getIndexUsingIterator(((TreeSet<Double>)scores).descendingSet(), wrapper.scoresValue) + 1);
			employeeEngagementRanksForTeam.add(getIndexUsingIterator(((TreeSet<Double>)employeeEngagement).descendingSet(), wrapper.employeeEngagementValue) + 1);
			interestCoverageRanksForTeam.add(getIndexUsingIterator(((TreeSet<Double>)interestCoverage).descendingSet(), wrapper.interestCovValue) + 1);
			marketingSpendRanksForTeam.add(getIndexUsingIterator(((TreeSet<Double>)marketingSpendRev).descendingSet(), wrapper.markSpendValue) + 1);
			eCarRanksForTeam.add(getIndexUsingIterator(((TreeSet<Double>)eCarsSales).descendingSet(), wrapper.eCarValue) + 1);
			co2RanksForTeam.add(getIndexUsingIterator(((TreeSet<Double>)co2Penalty).descendingSet(), wrapper.co2Value) + 1);
		}

		try {
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, List<Integer>> allRanks = new HashMap<>();
			allRanks.put("wacc", waccRanksForTeam);
			allRanks.put("factory_utilization", factoryUtilisationRanksForTeam);
			allRanks.put("scores", scoresRanksForTeam);
			allRanks.put("employee_engagement", employeeEngagementRanksForTeam);
			allRanks.put("interest_coverage", interestCoverageRanksForTeam);
			allRanks.put("marketing_spend_rev", marketingSpendRanksForTeam);
			allRanks.put("ecar_sales", eCarRanksForTeam);
			allRanks.put("co2_penalty", co2RanksForTeam);
			String json = objectMapper.writeValueAsString(allRanks);
			final HttpHeaders httpHeaders= new HttpHeaders();
			httpHeaders.setContentType(MediaType.APPLICATION_JSON);
			return new ResponseEntity<String>(json, httpHeaders, HttpStatus.OK);
		} catch (Exception ex) {
			LOG.debug(ex.getMessage());
		}

		final HttpHeaders httpHeaders= new HttpHeaders();
		httpHeaders.setContentType(MediaType.APPLICATION_JSON);
		return new ResponseEntity<String>(httpHeaders, HttpStatus.NOT_FOUND);
	}

	private int getIndexUsingIterator(Set<Double> set, Double element) {
		Iterator<Double> iterator = set.iterator();
		int index = 0;
		while (iterator.hasNext()) {
			if (element.equals(iterator.next())) {
				return index;
			}
			index++;
		}
		return -1;
	}

}
