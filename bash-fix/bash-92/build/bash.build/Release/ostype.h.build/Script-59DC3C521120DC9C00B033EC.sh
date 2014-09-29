#!/bin/sh
set -ev
REL=$(uname -r)
OSVER=${REL%%.*}

cat > ${DERIVED_FILES_DIR}/ostype.h <<EOF
#ifndef __OSTYPE__
#define __OSTYPE__

#define OSTYPE "darwin${OSVER}"
#endif /* __OSTYPE__ */
EOF
# $(OBJROOT)/** didn't work in header search paths
ln -fs ${DERIVED_FILES_DIR}/ostype.h ${SYMROOT}
