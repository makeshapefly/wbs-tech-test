package com.wbs.technicaltest.api.repository;

import com.wbs.technicaltest.api.model.KPI;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KpiRepository extends JpaRepository<KPI, String> {
    KPI findByDay(String day);
}

