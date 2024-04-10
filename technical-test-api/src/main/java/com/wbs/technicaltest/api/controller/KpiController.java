package com.wbs.technicaltest.api.controller;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

@RestController
public class KpiController {
	private static final Logger LOG = LoggerFactory.getLogger(KpiController.class);

	@GetMapping(path = {"/date", "/date/{date}"}, produces = "application/json")
	@CrossOrigin
	public ResponseEntity getForDate(@PathVariable("date") String date) {
		try {
			InputStream resource = new ClassPathResource(
					"data/" + date + ".json").getInputStream();

			String text = new BufferedReader(
					new InputStreamReader(resource, StandardCharsets.UTF_8))
					.lines()
					.collect(Collectors.joining("\n"));
			final HttpHeaders httpHeaders= new HttpHeaders();
			httpHeaders.setContentType(MediaType.APPLICATION_JSON);
			return new ResponseEntity<String>(text, httpHeaders, HttpStatus.OK);

		} catch (Exception ex) {
			LOG.debug(ex.getMessage());
		}
			final HttpHeaders httpHeaders= new HttpHeaders();
			httpHeaders.setContentType(MediaType.APPLICATION_JSON);
			return new ResponseEntity<String>(httpHeaders, HttpStatus.NOT_FOUND);
	}

}
