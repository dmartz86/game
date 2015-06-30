
TESTS = $(shell find "test/*.test.js")
REPORTER = dot

cov:
	@test -d reports || mkdir reports
	istanbul instrument --output helpers-cov helpers
	mv helpers helpers-orig && mv helpers-cov helpers
	ISTANBUL_REPORTERS=lcovonly mocha -R mocha-istanbul $(TESTS)
	mv lcov.info reports/
	rm -rf helpers
	mv helpers-orig helpers
	genhtml reports/lcov.info --output-directory reports/

clear:
	rm -fr coverage
	rm -fr reports
	rm -fr helpers-orig
	rm -fr helpers-cov
