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
                <h2 class="page-header">About the manuscript page</h2>
                <ul class="list">
                    <li><strong>Title: </strong><i><xsl:value-of select="//tei:title"/></i></li>
                    <li><strong>Author: </strong><xsl:value-of select="//tei:author"/> (#<xsl:value-of select="//tei:author/@xml:id"/>)</li>
                    <li><strong>Editor: </strong><xsl:value-of select="//tei:editor"/> (#<xsl:value-of select="//tei:editor/@xml:id"/>)</li>
                    <li><strong>Date written: </strong><xsl:value-of select="//tei:origDate"/></li>
                    <li><strong>Licence: </strong><xsl:value-of select="//tei:licence"/></li>
                    <li><strong>Institution: </strong><xsl:value-of select="//tei:institution"/></li>
                    <li><strong>Repository: </strong><xsl:value-of select="//tei:repository"/></li>
                    <li><strong>Shelfmark: </strong><xsl:value-of select="//tei:idno"/></li>
                    <li><strong>Folio: </strong><xsl:value-of select="//tei:locus"/></li>
                </ul>
            </div>
            <div class="col">
                <h2 class="page-header">Statistics</h2>
                <table>
                    <tr>
                        <th></th>
                        <th>#MWS</th>
                        <th>#PBS</th>
                        <th>Total</th>
                    </tr>
                    <tr>
                        <th>Number of modifications</th>
                        <td><xsl:value-of select="count(//tei:del[@hand='#MWS']|//tei:add[@hand='#MWS'])" /></td>
                        <td><xsl:value-of select="count(//tei:del[@hand='#PBS']|//tei:add[@hand='#PBS'])" /></td>
                        <td><strong><xsl:value-of select="count(//tei:del|//tei:add)" /></strong></td>
                    </tr>
                    <tr>
                        <th>Number of additions</th>
                        <td><xsl:value-of select="count(//tei:add[@hand='#MWS'])" /></td>
                        <td><xsl:value-of select="count(//tei:add[@hand='#PBS'])" /></td>
                        <td><strong><xsl:value-of select="count(//tei:add)" /></strong></td>
                    </tr>
                    <tr>
                        <th>Number of deletions</th>
                        <td><xsl:value-of select="count(//tei:del[@hand='#MWS'])" /></td>
                        <td><xsl:value-of select="count(//tei:del[@hand='#PBS'])" /></td>
                        <td><strong><xsl:value-of select="count(//tei:del)" /></strong></td>
                    </tr>
                </table>
            </div>
        </div>
        <hr/>
    </xsl:template>
    

</xsl:stylesheet>
