package com.wbs.technicaltest.api;

import com.wbs.technicaltest.api.controller.KpiController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TechnicalTestApiApplicationTests {

	@Autowired
	private KpiController controller;

	@Autowired
	private MockMvc mockMvc;

	@Test
	void contextLoads() {
		assertThat(controller).isNotNull();
	}

	@Test
	void shouldReturnKpiDataForDay1() throws Exception {
		this.mockMvc.perform(get("/date/2023-06-19")).andDo(print()).andExpect(status().isOk())
				.andExpect(content().contentType("application/json"));
	}

	@Test
	void shouldReturn404ForIncorrectDate() throws Exception {
		this.mockMvc.perform(get("/date/202-06-19")).andDo(print()).andExpect(status().isNotFound());
	}

}
