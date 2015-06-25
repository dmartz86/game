
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

test:
	@./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--slow 200ms \
		--bail

test-cov:
	@./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- \
		--reporter $(REPORTER) \
		test/

clear:
	rm -fr coverage
	rm -fr reports
	rm -fr helpers-orig
	rm -fr helpers-cov
