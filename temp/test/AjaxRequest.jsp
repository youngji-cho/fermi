<%@ page language="java" import="java.io.*,java.net.*" 	contentType="text/xml; charset=utf-8"
pageEncoding="utf-8"%>
<%
	URL url = new URL(request.getParameter("getUrl"));
	URLConnection connection = url.openConnection();
	connection.setRequestProperty("CONTENT-TYPE","text/html");
    BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream(),"utf-8"));
    String inputLine;
    String buffer = "";
    while ((inputLine = in.readLine()) != null){
     	buffer += inputLine.trim();
    }
    System.out.println("buffer : " + buffer);
    in.close();
%><%=buffer%>
