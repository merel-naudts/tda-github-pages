<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    exclude-result-prefixes="xs tei"
    version="2.0">
    
    <!-- <xsl:output method="xml" omit-xml-declaration="yes" indent="yes" /> -->

    
    <xsl:template match="tei:TEI">
        <div class="row">
            <div class="col">
                <h2 class="manuscript-header">About the manuscript page</h2>
                <ul class="list">
                    <li><strong>Title: </strong><i><xsl:value-of select="//tei:title"/></i></li>
                    <li><strong>Author: </strong><xsl:value-of select="//tei:author"/></li>
                    <li><strong>Editor: </strong><xsl:value-of select="//tei:editor"/></li>
                    <li><strong>Date written: </strong><xsl:value-of select="//tei:origDate"/></li>
                    <li><strong>Licence: </strong><xsl:value-of select="//tei:licence"/></li>
                    <li><strong>Institution: </strong><xsl:value-of select="//tei:institution"/></li>
                    <li><strong>Repository: </strong><xsl:value-of select="//tei:repository"/></li>
                    <li><strong>Shelfmark: </strong><xsl:value-of select="//tei:idno"/></li>
                    <li><strong>Hands: </strong></li>
                    <li><strong>Folio: </strong><xsl:value-of select="//tei:locus"/></li>
                </ul>
            </div>
            <div class="col">
                <ul> 
                    <li>Total number of modifications: 
                        <xsl:value-of select="count(//tei:del|//tei:add)" /> <!-- Counts all the add and del elements, and puts it in a list item -->
                    </li>
                    <li>Number of additions: 
                        <!-- count the additions only -->
                    </li>
                    <!-- add other list items in which you count things, such as the modifications made by Percy -->
                </ul>
            </div>
        </div>
        <hr/>
    </xsl:template>
    

</xsl:stylesheet>
