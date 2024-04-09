package com.wbs.technicaltest.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

@RestController
public class KpiController {

	@GetMapping(path = {"/date", "/date/{date}"}, produces = MediaType.APPLICATION_JSON_VALUE)
	@CrossOrigin
	public ResponseEntity getForDate(@PathVariable("date") String date) {
		try {
			InputStream resource = new ClassPathResource(
					"data/" + date + ".json").getInputStream();

			String text = new BufferedReader(
					new InputStreamReader(resource, StandardCharsets.UTF_8))
					.lines()
					.collect(Collectors.joining("\n"));
			return new ResponseEntity<>(text, HttpStatus.OK);
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

}
