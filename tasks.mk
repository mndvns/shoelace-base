
NAME         ?= $(notdir $(CURDIR))
FAMILY       ?= shoelace
PREFIX       ?= sl
ALIAS        ?= $(PREFIX)-$(NAME)
ALIAS_CC     ?= $(PREFIX)$(shell echo ${NAME} | python -c "print raw_input().capitalize()")
PROJECT      ?= $(FAMILY)-$(NAME)
DESCRIPTION  ?= A $(NAME) module for $(FAMILY)
ORGANIZATION ?= mvanasse
REPO         ?= $(ORGANIZATION)/$(PROJECT)
AUTHOR       ?= Michael Vanasse

JS_FILES      = $(shell find public -type f -name '*.js')
CSS_FILES     = $(shell find public -type f -name '*.css')
STYL_FILES    = $(shell find public -type f -name '*.styl')
PARTIAL_FILES = $(shell find public -type f -name '*.jade')

SHOELACE_BASE     = $(CURDIR)/node_modules/shoelace-base
SHOELACE_BASE_BIN = $(SHOELACE_BASE)/node_modules/.bin

DIRS  = $(shell cd $(SHOELACE_BASE)/files && find . -type d -name '*[a-zA-Z]' | sed 's/\.\///')
FILES = $(shell cd $(SHOELACE_BASE)/files && find . -type f                   | sed 's/\.\///')

define COMPONENT_BUILD
$(SHOELACE_BASE_BIN)/component build --copy --use $(realpath $(SHOELACE_BASE))/node_modules/component-stylus
endef

dev     : build test
build   : components build/build.js build/build.css
install : node_modules components
init    : $(DIRS) $(FILES) install
redo    : cleanse clean init

$(DIRS):
	@mkdir -p $@

$(FILES):
	@awk '{gsub(/PROJECT/, "$(PROJECT)"); gsub(/DESCRIPTION/, "$(DESCRIPTION)"); gsub(/REPO/, "$(REPO)"); gsub(/AUTHOR/, "$(AUTHOR)"); gsub(/ALIAS_CC/, "$(ALIAS_CC)"); gsub(/ALIAS/, "$(ALIAS)"); gsub(/NAME/, "$(NAME)"); print}' \
		$(SHOELACE_BASE)/files/$@ > $(CURDIR)/$@

node_modules: package.json
	@npm install

serve:
	@foreman start

components: component.json
	@$(SHOELACE_BASE_BIN)/component install

build/build.css: $(CSS_FILES) $(STYL_FILES)
	@$(call COMPONENT_BUILD)

build/build.js: $(JS_FILES)
	@$(call COMPONENT_BUILD)

clean:
	rm -fr build components

cleanse :
	rm -fr $(CURDIR)/$(FILES) $(CURDIR)/$(DIRS)

test: selenium
	@node_modules/.bin/protractor $(CURDIR)/protractorConfig.js

selenium:
	@node_modules/protractor/bin/install_selenium_standalone

.PHONY: clean init build test dev install redo
